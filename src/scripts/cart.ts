// Client-side order cart. No backend, no payment — this only builds a
// pre-filled WhatsApp message from whatever the customer selected, which
// they still review and send themselves from their own WhatsApp. Cart
// contents live in this browser's localStorage only.

type CartItem = { name: string; price: number; qty: number };
type Cart = Record<string, CartItem>;

const STORAGE_KEY = 'instapizza-cart-v1';
const NOTES_KEY = 'instapizza-cart-notes-v1';
const WHATSAPP_NUMBER = '59894753644';
const DEFAULT_MESSAGE = 'Hola! Quiero hacer un pedido en Instapizza Delivery.';

function loadCart(): Cart {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Cart) : {};
  } catch {
    return {};
  }
}

function saveCart(cart: Cart) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // private browsing / storage disabled — cart just won't persist across reloads
  }
}

function loadNotes(): string {
  try {
    return localStorage.getItem(NOTES_KEY) || '';
  } catch {
    return '';
  }
}

function saveNotes(notes: string) {
  try {
    localStorage.setItem(NOTES_KEY, notes);
  } catch {
    // ignore
  }
}

let cart: Cart = loadCart();

function money(n: number): string {
  return `$${n}`;
}

function cartCount(): number {
  return Object.values(cart).reduce((sum, i) => sum + i.qty, 0);
}

function cartTotal(): number {
  return Object.values(cart).reduce((sum, i) => sum + i.qty * i.price, 0);
}

function currentNotes(): string {
  const el = document.getElementById('cart-notes') as HTMLTextAreaElement | null;
  return el ? el.value.trim() : '';
}

function buildWhatsAppUrl(): string {
  const entries = Object.values(cart).filter((i) => i.qty > 0);

  if (entries.length === 0) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;
  }

  const lines = entries.map((i) => `• ${i.qty}x ${i.name} — ${money(i.price * i.qty)}`);
  let text = `Hola! Quiero hacer este pedido:\n\n${lines.join('\n')}\n\nTotal estimado: ${money(cartTotal())}`;

  const notes = currentNotes();
  if (notes) {
    text += `\n\nNotas: ${notes}`;
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function renderSteppers() {
  document.querySelectorAll<HTMLElement>('.order-stepper').forEach((el) => {
    const id = el.dataset.itemId;
    if (!id) return;
    const qty = cart[id]?.qty ?? 0;
    const qtyEl = el.querySelector('[data-role="qty"]');
    if (qtyEl) qtyEl.textContent = String(qty);
  });
}

function renderBadges() {
  const count = cartCount();
  const total = cartTotal();

  document.querySelectorAll('[data-role="cart-count"]').forEach((el) => {
    el.textContent = String(count);
  });
  document.querySelectorAll('[data-role="cart-total"]').forEach((el) => {
    el.textContent = money(total);
  });
  document.querySelectorAll<HTMLElement>('[data-role="cart-badge"]').forEach((el) => {
    if (count > 0) {
      el.classList.remove('hidden');
      if (el.classList.contains('absolute')) el.classList.add('inline-flex');
    } else {
      el.classList.add('hidden');
      el.classList.remove('inline-flex');
    }
  });
}

function renderDrawerList() {
  const list = document.getElementById('cart-drawer-list');
  const empty = document.getElementById('cart-drawer-empty');
  if (!list || !empty) return;

  const entries = Object.entries(cart).filter(([, i]) => i.qty > 0);
  list.innerHTML = '';

  if (entries.length === 0) {
    empty.classList.remove('hidden');
    list.classList.add('hidden');
    return;
  }

  empty.classList.add('hidden');
  list.classList.remove('hidden');

  for (const [id, item] of entries) {
    const row = document.createElement('li');
    row.className = 'flex items-center justify-between gap-3 py-3';

    const info = document.createElement('div');
    info.className = 'min-w-0 flex-1';
    const nameP = document.createElement('p');
    nameP.className = 'truncate text-sm font-semibold text-cream-50';
    nameP.textContent = item.name;
    const priceP = document.createElement('p');
    priceP.className = 'text-xs text-cream-100/60';
    priceP.textContent = `${money(item.price)} c/u`;
    info.append(nameP, priceP);

    const controls = document.createElement('div');
    controls.className = 'flex items-center gap-2';

    const decreaseBtn = document.createElement('button');
    decreaseBtn.type = 'button';
    decreaseBtn.dataset.action = 'decrease';
    decreaseBtn.dataset.itemId = id;
    decreaseBtn.setAttribute('aria-label', `Quitar ${item.name}`);
    decreaseBtn.className =
      'flex h-9 w-9 items-center justify-center rounded-md border border-ink-600 text-cream-100';
    decreaseBtn.textContent = '−';

    const qtySpan = document.createElement('span');
    qtySpan.className = 'w-5 text-center text-sm font-semibold tabular-nums';
    qtySpan.textContent = String(item.qty);

    const increaseBtn = document.createElement('button');
    increaseBtn.type = 'button';
    increaseBtn.dataset.action = 'increase';
    increaseBtn.dataset.itemId = id;
    increaseBtn.dataset.itemName = item.name;
    increaseBtn.dataset.itemPrice = String(item.price);
    increaseBtn.setAttribute('aria-label', `Agregar ${item.name}`);
    increaseBtn.className =
      'flex h-9 w-9 items-center justify-center rounded-md border border-gold-600 text-gold-400';
    increaseBtn.textContent = '+';

    controls.append(decreaseBtn, qtySpan, increaseBtn);

    const lineTotal = document.createElement('p');
    lineTotal.className = 'price-tag w-16 shrink-0 text-right text-sm';
    lineTotal.textContent = money(item.qty * item.price);

    row.append(info, controls, lineTotal);
    list.appendChild(row);
  }
}

function renderCheckoutLink() {
  const link = document.getElementById('cart-checkout-link') as HTMLAnchorElement | null;
  if (link) link.href = buildWhatsAppUrl();
}

function renderAll() {
  renderSteppers();
  renderBadges();
  renderDrawerList();
  renderCheckoutLink();
}

function changeQty(id: string, delta: number, name?: string, price?: number) {
  const existing = cart[id];
  const nextQty = Math.max(0, (existing?.qty ?? 0) + delta);

  if (nextQty === 0) {
    delete cart[id];
  } else {
    cart[id] = {
      name: existing?.name ?? name ?? id,
      price: existing?.price ?? price ?? 0,
      qty: nextQty,
    };
  }

  saveCart(cart);
  renderAll();
}

let lastFocusedBeforeOpen: HTMLElement | null = null;

function openDrawer() {
  const overlay = document.getElementById('cart-overlay');
  const drawer = document.getElementById('cart-drawer');
  if (!overlay || !drawer) return;

  lastFocusedBeforeOpen = document.activeElement as HTMLElement | null;
  overlay.classList.remove('hidden');
  drawer.classList.remove('hidden');
  drawer.setAttribute('aria-hidden', 'false');
  document.getElementById('cart-close')?.focus();
  document.body.classList.add('overflow-hidden');
  document.getElementById('floating-order-btn')?.classList.add('hidden');
}

function closeDrawer() {
  const overlay = document.getElementById('cart-overlay');
  const drawer = document.getElementById('cart-drawer');
  if (!overlay || !drawer) return;

  overlay.classList.add('hidden');
  drawer.classList.add('hidden');
  drawer.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('overflow-hidden');
  document.getElementById('floating-order-btn')?.classList.remove('hidden');
  lastFocusedBeforeOpen?.focus();
}

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;

  if (target.closest('[data-cart-open]')) {
    openDrawer();
    return;
  }

  if (target.closest('[data-cart-close]')) {
    closeDrawer();
    return;
  }

  if (target.closest('[data-cart-clear]')) {
    cart = {};
    saveCart(cart);
    renderAll();
    return;
  }

  const actionBtn = target.closest<HTMLElement>('[data-action]');
  if (actionBtn) {
    const stepper = actionBtn.closest<HTMLElement>('[data-item-id]');
    const id = actionBtn.dataset.itemId || stepper?.dataset.itemId;
    if (!id) return;
    const name = actionBtn.dataset.itemName || stepper?.dataset.itemName;
    const priceAttr = actionBtn.dataset.itemPrice || stepper?.dataset.itemPrice;
    const price = priceAttr ? Number(priceAttr) : undefined;
    const delta = actionBtn.dataset.action === 'increase' ? 1 : -1;
    changeQty(id, delta, name, price);
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const drawer = document.getElementById('cart-drawer');
    if (drawer && !drawer.classList.contains('hidden')) closeDrawer();
  }
});

const notesEl = document.getElementById('cart-notes') as HTMLTextAreaElement | null;
if (notesEl) {
  notesEl.value = loadNotes();
  notesEl.addEventListener('input', () => {
    saveNotes(notesEl.value);
    renderCheckoutLink();
  });
}

renderAll();
