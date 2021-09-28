/**************************
     BUSCADOR DE RECETAS
***************************/

//  Variables DOM
const inputRecipe = document.querySelector("#recipe");
const btnSearch = document.querySelector("#search__recipe");
const showRecipe = document.querySelector(".section__recipe")
const card = document.querySelector(".card__recipe")

// Habilitar y deshabilitar el buscador

const enabledBtnSearch = () => {
        btnSearch.disabled = false;
}

const disabledBtnSearch = () => {
        btnSearch.disabled = true;
        clean()
}

inputRecipe.addEventListener("input", (e) => {
        (inputRecipe.value === "") ? disabledBtnSearch() : enabledBtnSearch();
})


// Limpiar sección de recetas

const clean = () => {
        showRecipe.textContent = ""
        showRecipe.removeChild(card)
}


inputRecipe.addEventListener("input", (e) => {
        if  ((inputRecipe.value === "") && (showRecipe.textContent !== "")){
                clean()
        }
})

// Evento de escucha sobre el buscador si está habilitado

btnSearch.addEventListener("click", (e) => {

        fetch("../dist/js/recipes.json")
                .then(res => res.ok ? Promise.resolve(res) : Promise.reject(error))
                .then(res => res.json())
                .then(data => {
                        
                        const fragment = document.createDocumentFragment();

                        if (showRecipe.textContent === "") {

                                for (const key of data){

                                        if (key.title
                                                .toLowerCase()
                                                .normalize("NFD").replace(/[\u0300-\u036f]/g, '')
                                                .includes(inputRecipe.value
                                                        .toLowerCase()
                                                        .normalize("NFD").replace(/[\u0300-\u036f]/g, ''))){         
                                                
                                                               
                                                // Card de la receta
                                                const card = document.createElement("div");
                                                card.classList.add("card__recipe");


                                                // Título
                                                const title = document.createElement("h1");
                                                title.classList.add("title__recipe");
                                                title.textContent = `${key.title}`
                                                card.appendChild(title);


                                                // Ingredientes
                                                const subtitleIngredients = document.createElement("h2");
                                                subtitleIngredients.classList.add("subtitle__recipe");
                                                subtitleIngredients.textContent = "Ingredientes:"
                                                card.appendChild(subtitleIngredients);

                                                const listIngredients = document.createElement("ul");
                                                listIngredients.classList.add("list__ingredients");
                                                
                                                for (let i of key.ingredients){
                                                        const itemIngredients = document.createElement("li");
                                                        itemIngredients.classList.add("list__item__ingredients");
                                                        itemIngredients.textContent = `${i}`
                                                        listIngredients.appendChild(itemIngredients)
                                                }
                                                card.appendChild(listIngredients)


                                                // Elaboración

                                                const subtitleElaboration = document.createElement("h2");
                                                subtitleElaboration.classList.add("subtitle__recipe");
                                                subtitleElaboration.textContent = "Elaboración:"
                                                card.appendChild(subtitleElaboration);

                                                const sectionElaboration = document.createElement("div");
                                                sectionElaboration.classList.add("elaboration__recipe");

                                                for (let p of key.elaboration){
                                                        const elaboration = document.createElement("p");
                                                        elaboration.classList.add("paragraph__elaboration");
                                                        elaboration.textContent = `${p}`
                                                        sectionElaboration.appendChild(elaboration)
                                                }

                                                card.appendChild(sectionElaboration)

                                                fragment.appendChild(card)

                                        }
                                
                                        showRecipe.appendChild(fragment)
                
                                }
                        }

                        
                })
                .catch(err => console.log(err))
      
})