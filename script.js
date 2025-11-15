

let inputproduct = document.getElementById("inputproduct");
let addbtn = document.getElementById("addbtn");
let count = document.getElementById("count");
let inputsearch = document.getElementById("search");
let notfound = document.getElementById("notfound");
let content = document.getElementById("content");
let edit = null;
let editvalue = null;

let allproducts = [
    { id: 1, name: "Charcoal Pancil", price: 150 },
    { id: 2, name: "Paintbrush", price: 50 },
    { id: 3, name: "Watercolors", price: 500 },
    { id: 4, name: "Acrylic Paints", price: 700 },
    { id: 5, name: "Oil Paints", price: 850 },
    { id: 6, name: "Pastel Colors", price: 420, },
    { id: 7, name: "Gouache Colors", price: 880 },
    { id: 8, name: "Palette", price: 150 },
    { id: 9, name: "Markers", price: 200 }
  ]

function drow(){
    content.innerHTML = "";
    allproducts.forEach(ele => {
        content.innerHTML += `
        <div class="col-12 col-sm-6 col-md-4 mb-4">
            <div class="card h-100">
                <div class="card-body">
                
                    <h4 class="card-title">${ele.name}</h4>
                    <p class="card-text"> ${ele.price} $</p>

                    <a href="#" class="btn btn-warning ms-2" onclick="editname(${ele.id})">
                        <i class="fa-solid fa-pen-to-square"></i> Edit Name </a>

                    <a href="#" class="btn btn-warning ms-2" onclick="editprice(${ele.id})">
                    <i class="fa-solid fa-pen-to-square"></i> Edit Price</a>

                    <a href="#" class="btn btn-danger ms-2" onclick="deletebtn(${ele.id})">
                    <i class="fa-solid fa-trash"></i></a>

                </div>
            </div>
        </div>`;
      });
}
drow(allproducts);

inputproduct.addEventListener("input", () => {
  if (inputproduct.value != "") {
    addbtn.removeAttribute("disabled");
  } else {
    addbtn.setAttribute("disabled", true);
  }
});

function editname(id) {
  let findproduct = allproducts.find((f) => f.id === id);
  if (findproduct) {
    inputproduct.value = findproduct.name;
    addbtn.removeAttribute("disabled");
    addbtn.innerText = "Update";
    edit = id;
    editvalue = "name";
  }
}

function editprice(id) {
  let findproduct = allproducts.find((f) => f.id === id);
  if (findproduct) {
    inputproduct.value = findproduct.price;
    addbtn.removeAttribute("disabled");
    addbtn.innerText = "Update";
    edit = id;
    editvalue = "price";
  }
}

addbtn.addEventListener("click", () => {
  let db = allproducts.some(
    (d) =>
      d.name.toLocaleLowerCase().trim() ===
    inputproduct.value.toLocaleLowerCase().trim()
  );
  if (db) {
    Swal.fire({
      title: "المنتج موجود مسبقا",
      icon: "warning",
      draggable: true,
    });
    return;
  }
  if (edit) {
    let findproduct = allproducts.find((f) => f.id === edit);
    if (findproduct) {
      if (editvalue === "name") {
        findproduct.name = inputproduct.value;
      } else if (editvalue === "price") {
        findproduct.price = inputproduct.value;
      }
      drow();
    }
    edit = null;
    editvalue = null;
    addbtn.innerText = "Add";
  } else {
    let lastid = allproducts.length
    ? allproducts[allproducts.length - 1].id
    : 0;
    allproducts.push({
      id: ++lastid,
      name: inputproduct.value,
      price: prompt("Add Price "),
    });
    let product1 = allproducts[allproducts.length - 1];
    content.innerHTML +=`<div class="col-12 col-sm-6 col-md-4 mb-4">
    <div class="card h-100">
                <div class="card-body">

                    <h4 class="card-title">${product1.name}</h4>
                    <p class="card-text"> ${product1.price} $</p>

                    <a href="#" class="btn btn-warning ms-2" onclick="editname(${product1.id})">
                    <i class="fa-solid fa-pen-to-square"></i> Edit Name </a>

                    <a href="#" class="btn btn-warning ms-2" onclick="editprice(${product1.id})">
                    <i class="fa-solid fa-pen-to-square"></i> Edit Price</a>

                    <a href="#" class="btn btn-danger ms-2" onclick="deletebtn(${product1.id})">
                    <i class="fa-solid fa-trash"></i></a>

                </div>
                </div>
        </div>`;
}
 
count.innerHTML = `${allproducts.length} : عدد المنتجات`;
  inputproduct.value = "";
  addbtn.setAttribute("disabled", true);
});

function deletebtn(id) {
  let index = allproducts
  .map((del) => {
    return del.id;
  })
  .indexOf(id);

  if (index != -1) {
    allproducts.splice(index, 1); 
  }

  Swal.fire({
    title: "تم الحذف",
    icon: "success",
    draggable: true
  });

  drow();
  count.innerHTML = `${allproducts.length} : عدد المنتجات`;
}

inputsearch.addEventListener("input", () => {
  let inputvalue = inputsearch.value.toLocaleLowerCase();
  let productfiltr = allproducts.filter((item) => {
    return item.name.toLocaleLowerCase().includes(inputvalue);
  });
  content.innerHTML = "";
  productfiltr.forEach((product2) => {
    content.innerHTML += `
    <div class="col-12 col-sm-6 col-md-4 mb-4">
    <div class="card h-100">
    <div class="card-body">

                    <h4 class="card-title">${product2.name}</h4>
                    <p class="card-text"> ${product2.price} $</p>
                    
                    <a href="#" class="btn btn-warning ms-2" onclick="editname(${product2.id})">
                    <i class="fa-solid fa-pen-to-square"></i> Edit Name </a>

                    <a href="#" class="btn btn-warning ms-2" onclick="editprice(${product2.id})">
                    <i class="fa-solid fa-pen-to-square"></i> Edit Price</a>

                    <a href="#" class="btn btn-danger ms-2" onclick="deletebtn(${product2.id})">
                    <i class="fa-solid fa-trash"></i></a>

                </div>
            </div>
            </div>`
  });

  if (productfiltr.length == 0) {
    notfound.style.display = "block";
  } else {
    notfound.style.display = "none";
  }
});

count.innerHTML = `${allproducts.length}  :عدد المنتجات`;
