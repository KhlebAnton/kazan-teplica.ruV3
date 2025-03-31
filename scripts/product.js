fetch('../products/config.json')
    .then(response => response.json()) // 
    .then(data => {
        // Теперь данные доступны в переменной `data`

        start(data);


        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('cat');
        if(myParam) {
            setContent(1,0, false)
        } else {
            setContent(0,0, false)
        }
       

    })
    .catch(error => {
        console.error('Ошибка при загрузке JSON:', error);
    });

;

let dataProduct;
const productContainer = document.getElementById("productContainer");
function start(data) {
    dataProduct = data;
    setSideBar(dataProduct);
}
const sideBar = document.querySelector('.sidebar');
function setSideBar(data) {
    const sectionsList = data.sections;
    sectionsList.forEach((element, indexSection) => {


        const sideBarTitle = document.createElement('div');
        sideBarTitle.classList.add('sidebar__title');
        sideBarTitle.textContent = element.title;
        sideBar.appendChild(sideBarTitle);

        const sideBarSubCategory = document.createElement('div');
        sideBarSubCategory.classList.add('subcategory');
        element.content.forEach((content, indexSub) => {
            if(content.availability) {
                const subcategory = content.title;
                const subcategoryItem = document.createElement('div');
                subcategoryItem.classList.add('subcategory-item');
                subcategoryItem.setAttribute('data-section', indexSection);
                subcategoryItem.setAttribute('data-sub', indexSub);
    
    
                subcategoryItem.setAttribute('onclick', `setContent(${indexSection},${indexSub})`);
    
                subcategoryItem.textContent = subcategory;
                sideBarSubCategory.appendChild(subcategoryItem);
            }
            

        });
        sideBar.appendChild(sideBarSubCategory);
    });
};
function onClickSubCategory(sectionID, subID) {
    const subcategoryItems = document.querySelectorAll('.subcategory-item');
    subcategoryItems.forEach(el=> {
        el.classList.remove('sub_active');
        if(sectionID === +el.getAttribute('data-section') && subID === +el.getAttribute('data-sub')) {
            el.classList.add('sub_active');
        }
    })
}
const sectionCatalog = document.querySelector('.section_catalog');
function setContent(sectionID, subID, scroll = true) {
    onClickSubCategory(sectionID, subID);
    const products = dataProduct.sections[sectionID].content[subID].content;
    productContainer.classList.remove('container__polik-product');

    let policks;
    productContainer.innerHTML = '';
    if(scroll) {
        sectionCatalog.scrollIntoView({
            behavior: 'smooth',block: "start"
        });
    }
    
    if (dataProduct.sections[sectionID].title === "Теплицы") {
        dataProduct.sections.forEach(el => {
            if (el.title === 'Поликарбонат') {
                el.content.forEach(polick => {

                    if (polick.title === dataProduct.sections[sectionID].content[subID].polick) {
                        policks = polick
                    }
                });
            }
        })
        if (products) {
           
            let listInd = [];

            products.forEach((product, index) => {
                listInd.push(index);
                const productHtml = document.createElement('div');
                productHtml.classList.add('product');
                productHtml.setAttribute('id', `product${index}`);

                const productInfoHtml = document.createElement('div');
                productInfoHtml.classList.add('product__info');
                if(!product.availability) {
                    productInfoHtml.classList.add('product__info_availability');
                }
                productInfoHtml.innerHTML = `
                        <img class="product__info-img " src="../${product.image}" alt="${product.name}">
                    
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
                        data-length="${button.label}" onclick="showDescription(this)">
                        ${button.label}
                        </button>
                    `;
                });
                productSelectorDesc.appendChild(btnGroupLength);

                if (policks.content) {
                    productSelectorDesc.innerHTML += '<span>Поликарбонат:</span>';
                    const buttonGroupHTML = document.createElement('div');
                    buttonGroupHTML.classList.add('btn-group-polik');

                    if (policks.title === 'Тепличный') {
                        policks.content.forEach((polick, index) => {

                            if (polick.buttons) {
                                polick.buttons.forEach((button) => {
                                    buttonGroupHTML.innerHTML += `
                                        <button class="btn-desc polik ${index === 0 ? 'active' : ''}" 
                                        data-polik="${button.label}" onclick="showDescription(this)">
                                        ${button.label}
                                        </button>
                                    `;
                                });
                            }
                        });
                    } else if (policks.title === 'Цветной') {

                        policks.content[0].buttons.forEach((button, index) => {
                            if(!(dataProduct.sections[sectionID].content[subID].title === 'Мебель для дачи' && button.label === '8 мм')) {
                                buttonGroupHTML.innerHTML += `
                                <button class="btn-desc polik ${index === 0 ? 'active' : ''}" 
                                data-polik="${button.label}" onclick="showDescription(this)">
                                ${button.label}
                                </button>
                            `;
                            }
                        });
                    }
                    

                    productSelectorDesc.appendChild(buttonGroupHTML);

                }
                if(dataProduct.sections[sectionID].content[subID].title === 'Мебель для дачи') {
                    productSelectorDesc.innerHTML += '<span>Цвета:</span>';
                    productSelectorDesc.innerHTML += `
                    <div class="colors-polick">
                        <div class="color grey" style="background-color: #7c7973;"></div>
                        <div class="color brown" style="background-color: #7f4d28;"></div>
                        <div class="color biruyza" style="background-color: #09c5e8;"></div>
                        <div class="color blue" style="background-color: #227fe7;"></div>
                        <div class="color granat" style="background-color: #9c103f;"></div>
                        <div class="color green" style="background-color: #499c4c;"></div>
                        
                        <div class="color orange" style="background-color: #ea8819;"></div>
                        <div class="color red" style="background-color: #dc2922;"></div>
                        <div class="color yellow" style="background-color: #eeda3b;"></div>
                    </div>
                    `;
                }
                productHtml.appendChild(productSelectorDesc);




                // const productInfoContainer = document.createElement('div');
                // productInfoContainer.classList.add('product__desc_container');
                // if (!product.availability) {
                //     productInfoContainer.style.display = 'none';

                // }
                if(product.availability) {
                    if (policks.title === 'Тепличный') {

                        productHtml.appendChild(getDescription(policks.content, product.buttons, product.name === 'Парник' ? true : false));
    
    
    
                    } else if (policks.title === 'Цветной') {
                        let removed = policks.content.slice(0, 1);
                        productHtml.appendChild(getDescription(removed, product.buttons, dataProduct.sections[sectionID].content[subID].title === 'Мебель для дачи' ? true : false));
                    }
    
                } else {
                    productHtml.innerHTML += `
                        <div class="availability-info">
                        <span>Сожалеем...</span>
                        <span>Но данной позиции нет в наличии,</span>
                        <span>уточните поступление по номеру: </span>
                       
                        <a href="tel:+79872165566">+7(987)-216-55-66</a>
                        <a href="tel:+79196897195">+7(919)-689-71-95</a>
                        
                        <a href="#" class="nav_item call" ontouchstart>Написать нам</a>
                        </div>
                    `;
                }
                
                // productHtml.appendChild(productInfoContainer);
                productContainer.appendChild(productHtml);

            });




        }
    } else if (dataProduct.sections[sectionID].title === "Поликарбонат") {
        if (products) {
           
            productContainer.classList.add('container__polik-product');
            products.forEach((product, index) => {
                const productHtml = document.createElement('div');
                productHtml.classList.add('product');
                productHtml.setAttribute('id', `product${index}`);

                const productInfoHtml = document.createElement('div');
                productInfoHtml.classList.add('product__info');

                productInfoHtml.innerHTML = `
                                <img class="product__info-img" src="/${product.image}" alt="${product.name}">             
                        `;
                productHtml.appendChild(productInfoHtml);

                const productSelectorDesc = document.createElement('div');
                productSelectorDesc.classList.add('selector-descs');
                productSelectorDesc.innerHTML += `<h3>${product.name}</h3>`;

                const btnGroupLength = document.createElement('div');
                btnGroupLength.classList.add('btn-group-length');

                product.buttons.forEach((button, buttonIndex) => {
                    btnGroupLength.innerHTML += `
                                <button class="btn-desc length ${buttonIndex === 0 ? 'active' : ''}" 
                                data-length="${button.label}" onclick="showDescription(this)">
                                ${button.label}
                                </button>
                            `;
                });
                productSelectorDesc.appendChild(btnGroupLength);
                productHtml.appendChild(productSelectorDesc);


                productHtml.appendChild(getDescription(product.buttons));


                productContainer.appendChild(productHtml);

            });
        }
    }

}



function getDescription(btnsPolik, btnsGreen = null, parnik = null) {
    const productInfoContainer = document.createElement('div');
    productInfoContainer.classList.add('product__desc_container');

    const nameList = {
        "thickness": "Толщина",
        "density": "Плотность",
        "warranty": "Гарантийный срок",
        "lifeTime": "Срок службы",
        "weight": "Вес",
        "size": "Размер",
        "price": "Цена",
        "secondArc": "Тип",
        "base": "Основание ",
        "arc": "Дуги",
        "distance": "Расстояние между дуг",
        "width": "Ширина теплицы",
        "capacity": "Мест",
        "heigth": "Высота",
        "length": "Длина"
    };
    if (btnsGreen) {

        btnsGreen.forEach((btnGreen, index) => {

            btnsPolik.forEach((polik, indexBtn) => {

                polik.buttons.forEach((btnPolick, indexBtn2) => {
                    const productDesc = document.createElement('div');
                    productDesc.classList.add('product-description');
                    let totalPriceCount = 0;
                    if (index === 0 && indexBtn === 0 && indexBtn2 === 0) {
                        productDesc.classList.add('des-active');
                    };
                    if (parnik) {
                        totalPriceCount = +btnGreen.description.price + +btnPolick.description.price;
                    }
                    switch (btnGreen.label) {
                        case "4 м":
                            totalPriceCount = +btnGreen.description.price + (+btnPolick.description.price * 3);
                            break;
                        case "6 м":
                            totalPriceCount = +btnGreen.description.price + (+btnPolick.description.price * 4);
                            break;
                        case "8 м":
                            totalPriceCount = +btnGreen.description.price + (+btnPolick.description.price * 5);
                            break;
                        case "10 м":
                            totalPriceCount = +btnGreen.description.price + (+btnPolick.description.price * 6);
                            break;

                    }
                    productDesc.setAttribute('data-length', btnGreen.label);
                    productDesc.setAttribute('data-polik', btnPolick.label);

                    const policWrapper = document.createElement('div');
                    policWrapper.classList.add('product-description__item');
                    
                    policWrapper.innerHTML += `
                    <div class="product-description__info">          
                        <span>Поликарбонат:</span>
                    </div>`;

                    for (const key in btnPolick.description) {
                        const productInfo = document.createElement('div');

                        productInfo.classList.add('product-description__info');


                        const spanTitle = document.createElement('span');
                        spanTitle.classList.add('product-description__info-title');
                        for (const name in nameList) {
                            if (key === name) {
                                if(key === 'price') {
                                    spanTitle.textContent = '-' + nameList[name] + ' поликарбоната-';
                                } else {
                                    spanTitle.textContent = '-' + nameList[name] + '-';
                                }
                                
                                break;
                            } else {
                                spanTitle.textContent = '-' + key + '-';
                            }
                        }
                        const spanCount = document.createElement('span');
                        if(key === 'price') {
                            spanCount.textContent = totalPriceCount - btnGreen.description['price'];
                            spanCount.textContent += ' ₽'
                        } else {
                            spanCount.textContent = btnPolick.description[key];
                        }
                        
                        productInfo.appendChild(spanTitle)
                        productInfo.appendChild(spanCount)

                        policWrapper.appendChild(productInfo)
                        productDesc.appendChild(policWrapper)
                    };

                    const greenWrapper = document.createElement('div');
                    greenWrapper.classList.add('product-description__item');
                    greenWrapper.innerHTML += `
                    <div class="product-description__info">          
                        <span>Каркас:</span>
                    </div>`;

                    for (const key in btnGreen.description) {
                        const productInfo = document.createElement('div');

                        productInfo.classList.add('product-description__info');


                        const spanTitle = document.createElement('span');
                        spanTitle.classList.add('product-description__info-title');
                        for (const name in nameList) {
                            if (key === name) {
                                if(key === 'price') {
                                    spanTitle.textContent = '-' + nameList[name] + ' каркаса-';
                                } else {
                                    spanTitle.textContent = '-' + nameList[name] + '-';
                                }
                                break;
                            } else {
                                spanTitle.textContent = '-' + key + '-';
                            }
                        }
                        const spanCount = document.createElement('span');

                        if(key === 'price') {
                            spanCount.textContent =  btnGreen.description[key];
                            spanCount.textContent += ' ₽'
                        } else {
                            spanCount.textContent =  btnGreen.description[key];
                        }
                       
                        productInfo.appendChild(spanTitle);
                        productInfo.appendChild(spanCount);

                        greenWrapper.appendChild(productInfo)
                        productDesc.appendChild(greenWrapper)
                    }
                   


                    
                    const totalPrice = document.createElement('div');
                    totalPrice.classList.add('product-description__info-price');
                    totalPrice.innerHTML = `<span>Итого: ${totalPriceCount} ₽</span>`;

                    productDesc.appendChild(totalPrice)

                    productInfoContainer.appendChild(productDesc);
                })




            });

        });
    } else {
        btnsPolik.forEach((btn, index) => {

            const productDesc = document.createElement('div');
            productDesc.classList.add('product-description', 'product-description_polik');
            if (index === 0) {
                productDesc.classList.add('des-active');
            };
            productDesc.setAttribute('data-length', btn.label)


            for (const key in btn.description) {
                const productInfo = document.createElement('div');
                if (key !== 'price') {
                    productInfo.classList.add('product-description__info');
                } else {
                    productInfo.classList.add('product-description__info-price');
                };

                const spanTitle = document.createElement('span');
                spanTitle.classList.add('product-description__info-title');
                for (const name in nameList) {
                    if (key === name) {
                        spanTitle.textContent = nameList[name];
                    }
                }
                const spanCount = document.createElement('span');

                if(key === 'price') {
                    spanCount.textContent = btn.description[key];
                    spanCount.textContent += ' ₽'
                } else {
                    spanCount.textContent = btn.description[key];
                }
                
                productInfo.appendChild(spanTitle)
                productInfo.appendChild(spanCount)

                productDesc.appendChild(productInfo)
            }


            productInfoContainer.appendChild(productDesc);
        });
    }

    return productInfoContainer

};

function showDescription(btn) {
    const product = btn.closest('.product');

    const productBtns = product.querySelectorAll(`.${btn.classList[0]}`, `.${btn.classList[1]}`);
    const productInfoList = product.querySelectorAll('.product-description', '.product-description_polik')


    productBtns.forEach(productBtn => {
        if (productBtn.classList.contains(`${btn.classList[1]}`)) {
            productBtn.classList.remove('active')
        }

    });
    btn.classList.add('active');


    let dataGreen;
    let dataPolik;

    let parentoilik = btn.closest('.selector-descs');
    if (parentoilik) {
        let btnGroup = parentoilik.querySelector('.btn-group-polik');
        if (btnGroup) {
            dataPolik = btnGroup.querySelector('.btn-desc.active').getAttribute('data-polik');
        }
    };

    let parentGreen = btn.closest('.selector-descs');
    if (parentGreen) {
        let btnGroup = parentGreen.querySelector('.btn-group-length');
        if (btnGroup) {
            dataGreen = btnGroup.querySelector('.btn-desc.active').getAttribute('data-length');
        }
    }


    productInfoList.forEach(info => {
        info.classList.remove('des-active');
        if (!dataPolik) {
            if (info.getAttribute('data-length') === dataGreen) {
                info.classList.add('des-active');

            }
        } else {
            if (info.getAttribute('data-length') === dataGreen && info.getAttribute('data-polik') === dataPolik) {
                info.classList.add('des-active');

            }
        }

    });
};