const mealDetails = document.getElementById("meal-details");
const relatedGrid = document.getElementById("related-grid");

const mealId = Number(
    new URLSearchParams(window.location.search).get("id")
);

let quantity = 1;


/* =========================
   LOAD MEALS
========================= */

fetch("food_meals.json")
    .then(response => response.json())
    .then(data => {

        const meal = data.find(
            item => Number(item.id) === mealId
        );

        if (!meal) {
            mealDetails.innerHTML = `
                <h2>Meal not found</h2>
                <p>Please go back and select a meal.</p>
            `;
            return;
        }

        displayMeal(meal);
        displayRelated(data, meal);

    })
    .catch(error => {

        console.error(error);

        mealDetails.innerHTML = `
            <h2>Unable to load meal</h2>
            <p>Please try again.</p>
        `;

    });


/* =========================
   DISPLAY MEAL
========================= */

function displayMeal(meal) {

    quantity = 1;

    const price = meal.promo_price || meal.price;

    mealDetails.innerHTML = `
        <img src="${meal.image}" alt="${meal.name}">

        <div>
            <h1>${meal.name}</h1>

            <h2>₦${price}</h2>

            <p>⭐ ${meal.rating}</p>

            <p>
                <strong>Restaurant:</strong>
                ${meal.restaurant}
            </p>

            <p>
                <strong>Category:</strong>
                ${meal.category}
            </p>

            <p>
                <strong>Prep Time:</strong>
                ${meal.prep_time}
            </p>

            <p>${meal.description}</p>

            <div class="qty">
                <button id="minus" type="button">−</button>

                <span id="count">1</span>

                <button id="plus" type="button">+</button>
            </div>

            <div class="actions">
                <button id="add-cart" type="button">
                    Add to Cart
                </button>

                <button id="order-now" type="button">
                    Order Now
                </button>
            </div>
        </div>
    `;


    /* =========================
       PLUS
    ========================= */

    document.getElementById("plus").onclick = () => {

        quantity++;

        document.getElementById("count").textContent =
            quantity;

    };


    /* =========================
       MINUS
    ========================= */

    document.getElementById("minus").onclick = () => {

        if (quantity > 1) {

            quantity--;

            document.getElementById("count").textContent =
                quantity;

        }

    };


    /* =========================
       ADD TO CART
    ========================= */

    document.getElementById("add-cart").onclick = () => {

        let cart = [];

        try {

            cart =
                JSON.parse(
                    localStorage.getItem("cart")
                ) || [];

        } catch (error) {

            cart = [];

        }


        const existing = cart.find(
            item => Number(item.id) === Number(meal.id)
        );


        if (existing) {

            existing.quantity += quantity;

        } else {

            cart.push({
                ...meal,
                quantity: quantity
            });

        }


        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );


        /* SHOW MODAL */

        if (typeof showMealModal === "function") {

            showMealModal(
                "Added to Cart!",
                `${meal.name} has been added to your cart.`
            );

        } else {

            alert(`${meal.name} has been added to your cart.`);

        }

    };


    /* =========================
       ORDER NOW
    ========================= */

    document.getElementById("order-now").onclick = () => {

        localStorage.setItem(
            "checkout",
            JSON.stringify([
                {
                    ...meal,
                    quantity: quantity
                }
            ])
        );

        window.location.href = "checkout.html";

    };

}


/* =========================
   RELATED MEALS
========================= */

function displayRelated(meals, current) {

    const related = meals
        .filter(meal =>
            meal.category === current.category &&
            Number(meal.id) !== Number(current.id)
        )
        .slice(0, 4);


    relatedGrid.innerHTML = "";


    related.forEach(meal => {

        const card = document.createElement("div");

        card.className = "card";


        card.innerHTML = `
            <img src="${meal.image}" alt="${meal.name}">

            <div class="info">

                <h3>${meal.name}</h3>

                <div class="price">

                    <span>
                        ₦${meal.promo_price || meal.price}
                    </span>

                    <span>
                        ⭐ ${meal.rating}
                    </span>

                </div>

            </div>
        `;


        card.onclick = () => {

            window.location.href =
                `meal.html?id=${meal.id}`;

        };


        relatedGrid.appendChild(card);

    });

}