// script.js — Shopping cart logic
// Runs once the DOM is fully loaded

document.addEventListener("DOMContentLoaded", () => {
  const totalPriceEl = document.querySelector(".total");

  // Each product is wrapped in the OUTER ".card-body" div
  // (the one directly inside ".list-products")
  const productWrappers = document.querySelectorAll(
    ".list-products > .card-body",
  );

  productWrappers.forEach((wrapper) => initProduct(wrapper));

  // Initial total calculation (in case some quantities start above 0)
  updateTotal();

  /**
   * Wires up all the events (+, -, delete, like) for a single product card
   */
  function initProduct(wrapper) {
    const plusBtn = wrapper.querySelector(".fa-plus-circle");
    const minusBtn = wrapper.querySelector(".fa-minus-circle");
    const trashBtn = wrapper.querySelector(".fa-trash-alt");
    const heartBtn = wrapper.querySelector(".fa-heart");
    const quantityEl = wrapper.querySelector(".quantity");

    // --- Increase quantity ---
    plusBtn.addEventListener("click", () => {
      const currentQty = parseInt(quantityEl.textContent, 10);
      quantityEl.textContent = currentQty + 1;
      updateTotal();
    });

    // --- Decrease quantity (never below 0) ---
    minusBtn.addEventListener("click", () => {
      const currentQty = parseInt(quantityEl.textContent, 10);
      if (currentQty > 0) {
        quantityEl.textContent = currentQty - 1;
        updateTotal();
      }
    });

    // --- Delete the product entirely ---
    trashBtn.addEventListener("click", () => {
      wrapper.remove();
      updateTotal();
    });

    // --- Like / unlike (heart turns red when active) ---
    heartBtn.addEventListener("click", () => {
      heartBtn.classList.toggle("liked");
    });
  }

  /**
   * Recalculates and displays the total price
   * based on every remaining product's unit price * quantity
   */
  function updateTotal() {
    const remainingWrappers = document.querySelectorAll(
      ".list-products > .card-body",
    );
    let total = 0;

    remainingWrappers.forEach((wrapper) => {
      const unitPriceText = wrapper.querySelector(".unit-price").textContent;
      const unitPrice = parseFloat(unitPriceText); // "100 $" -> 100
      const quantity = parseInt(
        wrapper.querySelector(".quantity").textContent,
        10,
      );
      total += unitPrice * quantity;
    });

    totalPriceEl.textContent = `${total} $`;
  }
});
