

function showProducts(subcategoryId, categoryId, clickedElement) {
    var subcategoryItems = document.querySelectorAll(".subcategory-item");
    subcategoryItems.forEach(function (item) {
        item.style.backgroundColor = "";
        item.style.color = "";
    });

    clickedElement.style.backgroundColor = "#13A538";
    clickedElement.style.color = "#ffffff";

    loadProducts(subcategoryId);
};


function loadProducts(subcategoryId) {
    var productContainer = document.getElementById("productContainer");

    if (subcategoryId === 'greenhouse') {

        fetch('../products/greenhouse and polick.json')
            .then(response => response.json())
            .then(data => {
                var products = data[subcategoryId];
                var policks = data['greenhouse-polick'];
                if (products) {
                    productContainer.innerHTML = '';
                    let listInd = [];

                    products.forEach((product, index) => {
                        listInd.push(index);
                        const productHtml = document.createElement('div');
                        productHtml.classList.add('product');
                        productHtml.setAttribute('id', `product${index}`);

                        const productInfoHtml = document.createElement('div');
                        productInfoHtml.classList.add('product__info');

                        productInfoHtml.innerHTML = `
                                <img class="product__info-img" src="/${product.image}" alt="${product.name}">
                                ${product.availability === false ? `<span class="availability">НЕТ в наличии</span>` : ''}
                                
                            
                                        
                        `;
                        productHtml.appendChild(productInfoHtml);

                        const productSelectorDesc = document.createElement('div');
                        productSelectorDesc.classList.add('selector-descs');
                        if (!product.availability) {
                            productSelectorDesc.classList.add('def');
                        }
                        productSelectorDesc.innerHTML += `<h3>${product.name}</h3>`;

                        const btnGroupLength = document.createElement('div');
                        btnGroupLength.classList.add('btn-group-length');
                        productSelectorDesc.innerHTML += '<span>Длина:</span>';
                        product.buttons.forEach((button, buttonIndex) => {
                            btnGroupLength.innerHTML += `
                                <button class="btn-desc length ${buttonIndex === 0 ? 'active' : ''}" 
                                data-length="${button.label}" onclick="showDescriptionGreenhouse(this, 'product${index}')">
                                ${button.label}
                                </button>
                            `;
                        });
                        productSelectorDesc.appendChild(btnGroupLength);


                        productSelectorDesc.innerHTML += '<span>Поликарбонат:</span>';

                        const buttonGroupHTML = document.createElement('div');
                        buttonGroupHTML.classList.add('btn-group-polik');
                        productSelectorDesc.appendChild(buttonGroupHTML);

                        productHtml.appendChild(productSelectorDesc);


                        const productInfoContainer = document.createElement('div');
                        productInfoContainer.classList.add('product__desc_container');
                        if (!product.availability) {
                            productInfoContainer.style.display = 'none';

                        }
                        productHtml.appendChild(productInfoContainer);

                        productContainer.appendChild(productHtml);
                    });

                    if (policks) {
                        listInd.forEach(index => {
                            let btnGroupLength = document.getElementById(`product${index}`).querySelector(".btn-group-polik");
                            policks.forEach((polick, indexPol) => {

                                polick.buttons.forEach((button, buttonIndex) => {
                                    btnGroupLength.innerHTML += `
                                <button class="btn-desc polik ${indexPol === 0 ? 'active' : ''}" 
                                data-polik="${button.label}" onclick="showDescriptionGreenhouse(this, 'product${index}')">
                                ${button.label}
                                </button>
                            `;
                                });
                            });


                        });
                    }
                    
                    for (let index = 0; index < listInd.length; index++) {
                        let indpolic = 0;
                        for (let btnsGren of products) {
                            for (let btnsPolik of policks) {
                                if(document.getElementById(`product${index}`)) {
                                    let productHTML = document.getElementById(`product${index}`).querySelector('.product__desc_container');
                                    if(productHTML.style.display !== 'none' && productHTML != null) {
                                        productHTML.innerHTML += `${getDescriptionHTMLGreenhouse(btnsGren.buttons, btnsPolik.buttons, index, btnsGren.name)}`;
                                        showDescriptionGreenhouse(null, `product${index}`);
                                        indpolic++;
                                        if (indpolic === policks.length) {
                                            index++;
                                            indpolic = 0;
                                        }
                                    } else {
                                        productHTML.innerHTML += `нет описания`
                                    }
                                }
                                
                                
                            }
                        }
                    }
                }
            })
            .catch(error => {
                console.error('Error loading product data:', error);
            });
    } else if (subcategoryId === 'cottage-furniture') {
        fetch('../products/cottage-furniture and color-polick.json')
            .then(response => response.json())
            .then(data => {
                var products = data[subcategoryId];
                var policks = data['color-polick'];
                if (products) {
                    productContainer.innerHTML = '';
                    let listInd = [];

                    products.forEach((product, index) => {
                        listInd.push(index);
                        if (!product.availability) {
                            var productHTML = `
                        <div class="product" id="product${index}">
                            <img src="/${product.image}" alt="${product.name}">
                           
                            <div class="selector-descs def" >
                             <h3>${product.name}</h3>
                            <span class="availability">НЕТ в наличии</span>
                            <span>Длина:</span>
                                <div class="btn-group-length">
                        `;
                        } else {

                            var productHTML = `
                        <div class="product"id="product${index}">
                            <img src="/${product.image}" alt="${product.name}">
                            
                            <div class="selector-descs" >
                            <h3>${product.name}</h3>
                                <span>Длина:</span>
                                <div class="btn-group-length">
                        `;
                        }

                        var buttonGroupHTML = '';
                        product.buttons.forEach((button, buttonIndex) => {
                            buttonGroupHTML += `
                                <button class="btn-desc length ${buttonIndex === 0 ? 'active' : ''}" 
                                data-length="${button.label}" onclick="showDescriptionGreenhouse(this, 'product${index}')">
                                ${button.label}
                                </button>
                            `;
                        });
                        productHTML += buttonGroupHTML;
                        productHTML += '</div>';
                        productHTML += `<span>Цвета:</Span>
                                <div class="colors-polick">
                                    <div calss="color grey" style="background-color: #7c7973;"></div>
                                    <div calss="color brown" style="background-color: #7f4d28;"></div>
                                    <div calss="color biruyza" style="background-color: #09c5e8;"></div>
                                    <div calss="color blue" style="background-color: #227fe7;"></div>
                                    <div calss="color granat" style="background-color: #9c103f;"></div>
                                    <div calss="color green" style="background-color: #499c4c;"></div>
                                    
                                    <div calss="color orange" style="background-color: #ea8819;"></div>
                                    <div calss="color red" style="background-color: #dc2922;"></div>
                                    <div calss="color yellow" style="background-color: #eeda3b;"></div>
                                </div>
                            <span>Тип Поликарбоната:</Span>
                            <div class="btn-group-polik"> </div>
                             </div> <div class="product__desc_container"></div>               `

                        productContainer.innerHTML += productHTML;
                    }

                    );
                    if (policks) {
                        listInd.forEach(index => {
                            let btnGroupLength = document.getElementById(`product${index}`).querySelector(".btn-group-polik");
                            policks.forEach((polick, indexPol) => {

                                polick.buttons.forEach((button, buttonIndex) => {
                                    if ((button.label === "4 мм" || button.label === "6 мм") && indexPol < 1)
                                        btnGroupLength.innerHTML += `
                                <button class="btn-desc polik ${buttonIndex === 0 ? 'active' : ''}" 
                                data-polik="${button.label}" onclick="showDescriptionGreenhouse(this, 'product${index}')">
                                ${button.label}
                                </button>
                            `;
                                })
                            });
                            btnGroupLength.innerHTML += `</div> `

                        });
                    }
                    for (let index = 0; index < listInd.length; index++) {



                        let indpolic = 0;

                        for (let btnsGren of products) {


                            for (let btnsPolik of policks) {
                                let productHTML = document.getElementById(`product${index}`).querySelector('.product__desc_container');
                                productHTML.innerHTML += `${getDescriptionHTMLCottatgeFurniture(btnsGren.buttons, btnsPolik.buttons, index, btnsGren.name)}`;
                                showDescriptionGreenhouse(null, `product${index}`);
                                indpolic++;
                                if (indpolic === policks.length) {
                                    index++;
                                    indpolic = 0;
                                }
                            }

                        }


                    }



                }
            })
            .catch(error => {
                console.error('Error loading product data:', error);
            });

    } else if (subcategoryId === 'greenhouse-polick') {
        fetch(`../products/greenhouse and polick.json`)
            .then(response => response.json())
            .then(data => {
                var products = data[subcategoryId];
                if (products) {
                    productContainer.innerHTML = ''; // Clear existing content

                    products.forEach((product, index) => {
                        var productHTML = `
              <div class="product">
                <img src="/${product.image}" alt="${product.name}">
                
                <div class="selector-descs" id="product${index}">
                <h3>${product.name}</h3>
            `;

                        var buttonGroupHTML = ''; // Create a group of buttons
                        product.buttons.forEach((button, buttonIndex) => {
                            buttonGroupHTML += `
              <button class="btn-desc ${buttonIndex === 0 ? 'active' : ''}" 
                onclick="showDescription(${buttonIndex}, 'product${index}')">
                ${button.label}
              </button>
            `;
                        });

                        productHTML += buttonGroupHTML;
                        productHTML += `${getDescriptionHTMLGreenhousePolik(product.buttons)}`;
                        productContainer.innerHTML += productHTML;
                    });
                }
            })
            .catch(error => {
                console.error('Error loading product data:', error);
            });
    } else if (subcategoryId === 'color-polick') {
        fetch(`../products/cottage-furniture and color-polick.json`)
            .then(response => response.json())
            .then(data => {
                var products = data[subcategoryId];
                if (products) {
                    productContainer.innerHTML = ''; // Clear existing content

                    products.forEach((product, index) => {
                        var productHTML = `
              <div class="product">
                <img src="/${product.image}" alt="${product.name}">
                
                <div class="selector-descs" id="product${index}">
                <h3>${product.name}</h3>
            `;

                        var buttonGroupHTML = ''; // Create a group of buttons
                        product.buttons.forEach((button, buttonIndex) => {
                            buttonGroupHTML += `
              <button class="btn-desc ${buttonIndex === 0 ? 'active' : ''}" 
                onclick="showDescription(${buttonIndex}, 'product${index}')">
                ${button.label}
              </button>
            `;
                        });

                        productHTML += buttonGroupHTML;
                        productHTML += `${getDescriptionHTMLGreenhousePolik(product.buttons)}`;
                        productContainer.innerHTML += productHTML;
                    });
                }
            })
            .catch(error => {
                console.error('Error loading product data:', error);
            });
    } else {
        // Make an AJAX request to load product data from products.json
        fetch(`../products/${subcategoryId}.json`)
            .then(response => response.json())
            .then(data => {
                var products = data[subcategoryId];
                if (products) {
                    productContainer.innerHTML = ''; // Clear existing content

                    products.forEach((product, index) => {
                        var productHTML = `
              <div class="product">
                <img src="/${product.image}" alt="${product.name}">
                
                <div class="selector-descs" id="product${index}">
                <h3>${product.name}</h3>
            `;

                        var buttonGroupHTML = ''; // Create a group of buttons
                        product.buttons.forEach((button, buttonIndex) => {
                            buttonGroupHTML += `
              <button class="btn-desc ${buttonIndex === 0 ? 'active' : ''}" 
                onclick="showDescription(${buttonIndex}, 'product${index}')">
                ${button.label}
              </button>
            `;
                        });

                        productHTML += buttonGroupHTML; // Add buttons to the product
                        if (subcategoryId === 'engineering') {
                            productHTML += `${getDescriptionHTMLEngineer(product.buttons)}`;
                        } else if (subcategoryId === 'monolit') {
                            productHTML += `${getDescriptionHTMLMonolit(product.buttons)}`;
                        }
                        productContainer.innerHTML += productHTML;
                    });
                }
            })
            .catch(error => {
                console.error('Error loading product data:', error);
            });
    }
}
function getDescriptionHTMLEngineer(buttons) {
    var descriptionHTML = '';
    buttons.forEach((button, buttonIndex) => {
        descriptionHTML += `
        <div class="product-description product-description_polik ${buttonIndex === 0 ? 'des-active' : ''}">
            <div class="product-description__info">
                <span class="product-description__info-title">Толщина </span> 
                <span >${button.description.thickness}</span> 
            </div>
            <div class="product-description__info">
                <span class="product-description__info-title">Плотность</span> 
                <span>${button.description.density}</span>

            </div>
           <div class="product-description__info">
                <span class="product-description__info-title">Гарантийный срок</span> 
                <span>${button.description.warranty}</span>
           </div>
           <div class="product-description__info-price">
                <span>${button.description.price} ₽</span>
           </div>
          
        </div>
      `;
    });
    return descriptionHTML;
}
function getDescriptionHTMLMonolit(buttons) {
    var descriptionHTML = '';
    buttons.forEach((button, buttonIndex) => {
        descriptionHTML += `
        <div class="product-description product-description_polik ${buttonIndex === 0 ? 'des-active' : ''}">
        <div class="product-description__info">
<span class="product-description__info-title">Толщина </span>
<span>${button.description.thickness}</span>
        </div>
        <div class="product-description__info">
        <span class="product-description__info-title">Вес листа</span>
 <span>${button.description.weight}</span>
        </div>
        <div class="product-description__info">
  <span class="product-description__info-title">Размер листа</span>
 <span>${button.description.size}</span>
        </div>
        <div class="product-description__info-price">
 <span>${button.description.price} ₽</span>
        </div>    
        </div>
      `;
    });
    return descriptionHTML;
}

function getDescriptionHTMLGreenhousePolik(buttons) {
    var descriptionHTML = '';
    buttons.forEach((button, buttonIndex) => {
        descriptionHTML += `
        <div class="product-description product-description_polik ${buttonIndex === 0 ? 'des-active' : ''}">
        <div class="product-description__info">  
        <span class="product-description__info-title">Толщина </span>
          <span>${button.description.thickness}</span> </div>
       <div class="product-description__info">   
          <span class="product-description__info-title">Плотность </span>
          <span>${button.description.density}</span></div>
<div class="product-description__info">
          <span class="product-description__info-title">Гарантийный срок </span>
          <span>${button.description.warranty}</span></div>
<div class="product-description__info">
          <span class="product-description__info-title">Срок службы </span>
          <span>${button.description.lifeTime}</span></div>

          <div class="product-description__info-price">
          <span>${button.description.price} ₽</span>
          </div>   
        </div>
      `;
    });
    return descriptionHTML;
}
function getDescriptionHTMLGreenhouse(btnsGren, btnsPolik, buttonIndex, label) {
    var descriptionHTML = '';


    if (label === "Парник") {
        // Переберите активные кнопки длины и поликарбоната и создайте соответствующее описание
        btnsGren.forEach(function (grenBtn) {
            btnsPolik.forEach(function (polickBtn) {

                // Создайте описание с атрибутами длины и поликарбоната
                descriptionHTML += `
            <div class="product-description "
                data-product="product${buttonIndex}" data-length="${grenBtn.label}" data-polik="${polickBtn.label}">
                 <div class="">
                 <div class="product-description__info">
                            <span>Оцинкованный каркас:</span></div>
<div class="product-description__info">
                             <span class="product-description__info-title">Дуги </span>
                            <span>${grenBtn.description.arc}</span>
 </div>
<div class="product-description__info">
                                 <span class="product-description__info-title">Высота </span>
                                <span>${grenBtn.description.hiegth}</span>
                             </div>
                            <div class="product-description__info">
                                 <span class="product-description__info-title">Ширина теплицы </span>
                                <span>${grenBtn.description.width}</span>
                             </div>
                            <div class="product-description__info">
                                 <span class="product-description__info-title">Цена каркаса </span>
                                <span>${grenBtn.description.price} ₽</span>
                   </div>
                </div>
                <div class="">
                <div class="product-description__info">
                            <span>Поликарбонат:</span></div>
<div class="product-description__info">
                            <span class="product-description__info-title">Толщина </span>
                            <span>${polickBtn.description.thickness}</span> 
  </div>                          
<div class="product-description__info">                            
                            <span class="product-description__info-title">Плотность </span>
                            <span>${polickBtn.description.density}</span>
</div>
<div class="product-description__info">
                            <span class="product-description__info-title">Гарантийный срок </span>
                            <span>${polickBtn.description.warranty}</span>
</div>

<div class="product-description__info">                            
<span class="product-description__info-title">Срок службы </span>
                            <span>${polickBtn.description.lifeTime}</span>
</div>
<div class="product-description__info">
                            <span class="product-description__info-title">Цена каркаса </span>
                            <span>${polickBtn.description.price} ₽</span>
 </div>                           
                </div>
                    <div class="product-description__info-price">
                  <span>Итого: ${+grenBtn.description.price + +polickBtn.description.price} ₽</span></div>
                   </div>
                   
                `;
            });
        });
    } else {
        // Переберите активные кнопки длины и поликарбоната и создайте соответствующее описание
        btnsGren.forEach(function (grenBtn) {
            btnsPolik.forEach(function (polickBtn) {

                let totalPrice = 0;
                switch (grenBtn.label) {
                    case "4 м":
                        totalPrice = +grenBtn.description.price + (+polickBtn.description.price * 3);
                        break;
                    case "6 м":
                        totalPrice = +grenBtn.description.price + (+polickBtn.description.price * 4);
                        break;
                    case "8 м":
                        totalPrice = +grenBtn.description.price + (+polickBtn.description.price * 5);
                        break;
                    case "10 м":
                        totalPrice = +grenBtn.description.price + (+polickBtn.description.price * 6);
                        break;

                }

                // Создайте описание с атрибутами длины и поликарбоната
                descriptionHTML += `
            <div class="product-description"    data-product="product${buttonIndex}" data-length="${grenBtn.label}" data-polik="${polickBtn.label}">
                <div class="">
                    <div class="product-description__info">
                         <span>Оцинкованный каркас ${grenBtn.description.secondArc}:</span>
                    </div>
                    <div class="product-description__info">
                   <span class="product-description__info-title">Дуги </span>
                   <span>${grenBtn.description.arc}</span>
                    </div>
<div class="product-description__info">
                   <span class="product-description__info-title">Основание </span>
                   <span>${grenBtn.description.base}</span>
</div>
<div class="product-description__info">
                   <span class="product-description__info-title">Расстояние между дуг </span>
                   <span>${grenBtn.description.distance}</span>
</div>
<div class="product-description__info">
                  <span class="product-description__info-title">Ширина теплицы </span>
                  <span>${grenBtn.description.width}</span>
</div>
<div class="product-description__info">
                  <span class="product-description__info-title">Цена каркаса </span>
                  <span>${grenBtn.description.price} ₽</span>

</div>
</div> 
<div class="">       
<div class="product-description__info">          
                  <span>Поликарбонат:</span>
</div>
<div class="product-description__info">
                  <span class="product-description__info-title">Толщина </span>
                  <span>${polickBtn.description.thickness}</span>
 </div>                 
 <div class="product-description__info">                 
                  <span class="product-description__info-title">Плотность </span>
                  <span>${polickBtn.description.density}</span>
</div>
<div class="product-description__info">
                 <span class="product-description__info-title">Гарантийный срок </span>
                 <span>${polickBtn.description.warranty}</span>
</div>
<div class="product-description__info">
                  <span class="product-description__info-title">Срок службы </span>
                  <span>${polickBtn.description.lifeTime}</span>
</div>
<div class="product-description__info">
                  <span class="product-description__info-title">Цена поликарбоната </span>
                  <span>${totalPrice - grenBtn.description.price} ₽</span>
</div>
</div>
                 

        <div class="product-description__info-price">
                  <span>Итого: ${totalPrice} ₽</span>
                    </div>
                   </div>
                   
                `;
            });
        });
    }






    return descriptionHTML;
}
function getDescriptionHTMLCottatgeFurniture(btnsGren, btnsPolik, buttonIndex, label) {
    var descriptionHTML = '';

    // Переберите активные кнопки длины и поликарбоната и создайте соответствующее описание
    btnsGren.forEach(function (grenBtn) {
        btnsPolik.forEach(function (polickBtn) {

            // Создайте описание с атрибутами длины и поликарбоната
            descriptionHTML += `
            <div class="product-description "
                data-product="product${buttonIndex}" data-length="${grenBtn.label}" data-polik="${polickBtn.label}">

<div class="">
 <div class="product-description__info">
                   <span>Беседка для ${grenBtn.description.capacity} человек:</span>
</div>
 <div class="product-description__info">
                    <span class="product-description__info-title">Доски в комплекте</span>
</div>
 <div class="product-description__info">
                   <span class="product-description__info-title">Высота </span>
                   <span>${grenBtn.description.heigth}</span>
</div>
 <div class="product-description__info">
                  <span class="product-description__info-title">Ширина </span>
                   <span>${grenBtn.description.width}</span>
</div>
 <div class="product-description__info">
                   <span class="product-description__info-title">Длина </span>
                   <span>${grenBtn.description.length}</span>
</div>
 <div class="product-description__info">
                   <span class="product-description__info-title">Дуга </span>
                   <span>${grenBtn.description.arc}</span>
</div>

  <div class="product-description__info">                 
                 <span class="product-description__info-title">Цена каркаса </span>
                 <span>${grenBtn.description.price} ₽</span>
</div>

</div>
<div class="">                 
                  <span>Поликарбонат:</span>

 <div class="product-description__info">
                  <span class="product-description__info-title">Толщина </span>
                  <span>${polickBtn.description.thickness}</span>
                  </div>
   <div class="product-description__info">

                  <span class="product-description__info-title">Плотность </span>
                  <span>${polickBtn.description.density}</span>
</div>
 <div class="product-description__info">
                  <span class="product-description__info-title">Гарантийный срок </span>
                  <span>${polickBtn.description.warranty}</span>
</div>
 <div class="product-description__info">
                  <span class="product-description__info-title">Срок службы </span>
                  <span>${polickBtn.description.lifeTime}</span>
</div>
 <div class="product-description__info">
                 <span class="product-description__info-title">Цена Поликарбоната</span>
                 <span>${polickBtn.description.price} ₽</span>
 </div>                 
                  

</div>
<div class="product-description__info-price">
                  <span>Итого: ${+grenBtn.description.price + +polickBtn.description.price} ₽</span>
                   </div>
                   </div>
                   
                `;
        });
    });
    return descriptionHTML;
}

function clearProducts() {
    var productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = "";
}
function showDescription(index, productId) {
    const descriptions = document.querySelectorAll(`#${productId} .product-description`);
    const buttons = document.querySelectorAll(`#${productId}  .btn-desc`);

    descriptions.forEach((desc) => {
        desc.classList.remove("des-active");
    });
    descriptions[index].classList.add("des-active");

    buttons.forEach((button) => {
        button.classList.remove("active");
    });

    buttons[index].classList.add("active");
}


function showDescriptionGreenhouse(button, productId) {
    // Определяем группу кнопок, к которой принадлежит текущая кнопка
    if (button) {
        var buttonGroup = button.parentElement;
        var buttonsInGroup = buttonGroup.querySelectorAll(".btn-desc");

        // Снимаем активное состояние со всех кнопок в этой группе
        buttonsInGroup.forEach(function (btn) {
            btn.classList.remove("active");
        });

        // Помечаем текущую кнопку как активную
        button.classList.add("active");
    }


    // Получаем активные кнопки в обеих группах
    var selectedLengthButtons = document.querySelectorAll("#" + productId + " .btn-group-length .btn-desc.active");
    var selectedPolikButtons = document.querySelectorAll("#" + productId + " .btn-group-polik .btn-desc.active");

    // Получаем элементы с описаниями
    var descriptions = document.querySelectorAll(".product-description");

    // Скрываем все описания для данного продукта
    descriptions.forEach(function (description) {
        if (description.getAttribute("data-product") === productId) {
            description.classList.remove("des-active");
        }
    });

    // Определяем сочетание активных кнопок и показываем соответствующее описание
    selectedLengthButtons.forEach(function (selectedLength) {
        selectedPolikButtons.forEach(function (selectedPolik) {
            var descriptionSelector = ".product-description[data-product='" + productId + "'][data-length='" + selectedLength.getAttribute("data-length") + "'][data-polik='" + selectedPolik.getAttribute("data-polik") + "']";
            var matchingDescription = document.querySelector(descriptionSelector);
            if (matchingDescription) {
                matchingDescription.classList.add("des-active");
            }
        });
    });
}
