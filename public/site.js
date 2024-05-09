(async () => {

    const button = document.querySelector('button')
    const nameInput = document.querySelector('#name-input')
    const priceInput = document.querySelector('#price-input')
    const descriptionInput = document.querySelector('#description-input')
    const imageInput = document.querySelector('#image-input')
    const ul = document.querySelector('#menu-list')

    

    const getMenu = async () => {
		const response = await fetch('/api/menu')
		const menu = await response.json()
		return menu
	}

    const displayMenu = menu => {
		ul.innerHTML = ''
		menu.forEach(({ id, name, price, image, description }) => {
			const li = document.createElement('li')
			ul.appendChild(li)

			const nameSpan = document.createElement('span')
			nameSpan.textContent = name
			li.appendChild(nameSpan)

            const priceSpan = document.createElement('span')
			priceSpan.textContent = price
			li.appendChild(priceSpan)

            const descriptioneSpan = document.createElement('span')
			descriptioneSpan.textContent = description
			li.appendChild(descriptioneSpan)

            const imgSpan = document.createElement('img')
			imgSpan.src = image
			li.appendChild(imgSpan)

			
		})
		
	}

    displayMenu(await getMenu())

    button.addEventListener('click', async () => {

        const data = {
            name: nameInput.value,
            price: priceInput.value,
            description: descriptionInput.value,
            image: imageInput.value
        }

        const response = await fetch('/api/menu', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( data )
        })

        nameInput.value = ''
        priceInput.value = ''
        descriptionInput.value = ''
        imageInput.value = ''
        displayMenu(await getMenu())
    })



})()