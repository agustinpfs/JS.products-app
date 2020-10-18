  
// Product Constructor
class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

// UI Constructor
class UI {
    // Add a new Product
    addProduct(product) {
        const productList = document.getElementById("product-list");
        //creo un elemento html para agregarlo a productList:
        const element = document.createElement("div");
        element.innerHTML = `
                <div class="card text-center mb-4">
                    <div class="card-body">
                        <strong>Product</strong>: ${product.name} -
                        <strong>Price</strong>: ${product.price} - 
                        <strong>Year</strong>: ${product.year}
                        <a href="#" class="btn btn-danger" name="delete">Delete</a>
                    </div>
                </div>
            `;
        // agrego el elemento(element) a productList: 
        productList.appendChild(element);
    }

    resetForm() {
        document.getElementById("product-form").reset();
      }
    
  
    deleteProduct(element) { //element -> e.target
        if (element.name === "delete") { // si hace click en el link name=delete
            element.parentElement.parentElement.remove();
            // this.showMessage("Product Deleted Succsssfully", "danger"); //otra opción para mostrar message
          }
    }
  
    showMessage(message, cssClass) {
        const div = document.createElement("div");
        div.className = `alert alert-${cssClass} mt-2`; //className -> agrega clase
        div.appendChild(document.createTextNode(message)); //crea elemento hijo y createTextNode crea texto

        // Show in The DOM
        const container = document.querySelector(".container");
        const app = document.querySelector("#App");

        // Insert Message in the UI
        container.insertBefore(div, app);

        // Remove the Message after 3 seconds
        setTimeout(function () {
        document.querySelector(".alert").remove();
        }, 3000);
    }
}

document
  .getElementById("product-form")
  .addEventListener("submit", function (e) { //cdo se ejecuta submit me da el dato event "e"
    // Override the default Form behaviour
    e.preventDefault();
    // Getting Form Values
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const year = document.getElementById("year").value;

    // Create a new Oject Product
    const product = new Product(name, price, year);

    //tengo que conectar con la interfáz para que muestre los datos "UI"
    // Create a new UI instance
    const ui = new UI();

    // Input User Validation
    if (name === "" || price === "" || year === "") {
        return ui.showMessage("Please Insert data in all fields", "danger");
      }
  
      // Save Product
      ui.addProduct(product);
      ui.showMessage("Product Added Successfully", "success");
      ui.resetForm();

  });

  document.getElementById("product-list").addEventListener("click", (e) => {
    const ui = new UI();
    ui.deleteProduct(e.target); //target elemento del evento que está capturando
    e.preventDefault();
    ui.showMessage("Product Added Successfully", "danger");
  });