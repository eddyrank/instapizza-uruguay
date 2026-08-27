// Interactive topping picker for the Muzza base pizza. Computes a live
// price from checked toppings and, on "Agregar al pedido", hands a
// composed id/name/price/qty off to the shared cart (window.instapizzaCartAdd,
// exposed by cart.ts). No topping data is duplicated here — everything
// comes from data-topping-* attributes rendered from menu.ts.

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const builder = document.getElementById('pizza-builder');
if (builder) {
  const basePrice = Number(builder.dataset.basePrice || '0');
  const baseName = builder.dataset.baseName || 'Pizza Muzza';
  const priceEl = document.getElementById('pizza-builder-price');
  const qtyEl = document.getElementById('pizza-builder-qty');
  let qty = 1;

  function selectedToppings() {
    return Array.from(builder!.querySelectorAll<HTMLInputElement>('.pizza-topping:checked')).map((el) => ({
      name: el.dataset.toppingName || '',
      price: Number(el.dataset.toppingPrice || '0'),
    }));
  }

  function currentTotal() {
    return basePrice + selectedToppings().reduce((sum, t) => sum + t.price, 0);
  }

  function renderPrice() {
    if (priceEl) priceEl.textContent = `$${currentTotal()}`;
  }

  function renderQty() {
    if (qtyEl) qtyEl.textContent = String(qty);
  }

  builder.querySelectorAll<HTMLInputElement>('.pizza-topping').forEach((el) => {
    el.addEventListener('change', () => {
      const chip = el.closest('.topping-chip');
      if (chip) {
        // Toggle mutually exclusive pairs rather than layering the gold
        // classes on top — with equal specificity, whichever utility
        // happens to land later in the compiled stylesheet wins the
        // cascade regardless of class order in the attribute, so the base
        // "unchecked" classes must actually be removed, not just outweighed.
        chip.classList.toggle('!border-gold-500', el.checked);
        chip.classList.toggle('border-ink-700', !el.checked);
        chip.classList.toggle('!bg-gold-500/10', el.checked);
        chip.classList.toggle('bg-ink-950', !el.checked);
        chip.classList.toggle('!text-gold-300', el.checked);
        chip.classList.toggle('text-cream-100/80', !el.checked);
      }
      renderPrice();
    });
  });

  builder.querySelectorAll<HTMLElement>('[data-pizza-qty]').forEach((btn) => {
    btn.addEventListener('click', () => {
      qty = Math.max(1, qty + (btn.dataset.pizzaQty === 'increase' ? 1 : -1));
      renderQty();
    });
  });

  const addBtn = document.getElementById('pizza-builder-add');
  addBtn?.addEventListener('click', () => {
    const toppings = selectedToppings();
    const id = toppings.length ? `pizza-muzza-${toppings.map((t) => slugify(t.name)).sort().join('-')}` : 'pizza-muzza';
    const name = toppings.length ? `${baseName} + ${toppings.map((t) => t.name).join(', ')}` : baseName;
    const price = currentTotal();

    window.instapizzaCartAdd?.(id, qty, name, price);

    qty = 1;
    renderQty();

    if (addBtn) {
      const original = addBtn.textContent;
      addBtn.textContent = '¡Agregado!';
      window.setTimeout(() => {
        addBtn.textContent = original;
      }, 1200);
    }
  });

  renderPrice();
  renderQty();
}
