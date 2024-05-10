(async () => {
    // Menu 
    const button = document.querySelector('#menu-button')
    const nameInput = document.querySelector('#name-input')
    const priceInput = document.querySelector('#price-input')
    const descriptionInput = document.querySelector('#description-input')
    const imageInput = document.querySelector('#image-input')
    const menuUl = document.querySelector('#menu-list')


    // event 
    const eventUl = document.querySelector('#event-list')
    

    const getMenu = async () => {
		const response = await fetch('/api/menu')
		const menu = await response.json()
		return menu
	}

    const getEvents = async () => {
		const response = await fetch('/api/events')
		const events = await response.json()
		return events
	}

    const displayMenu = menu => {
		menuUl.innerHTML = ''
		menu.forEach(({ id, name, price, image, description }) => {
			const li = document.createElement('li')
			menuUl.appendChild(li)

			const nameSpan = document.createElement('span')
			nameSpan.textContent = name
			li.appendChild(nameSpan)

            const priceSpan = document.createElement('span')
			priceSpan.textContent = price
			li.appendChild(priceSpan)

            const descriptionSpan = document.createElement('span')
			descriptionSpan.textContent = description
			li.appendChild(descriptionSpan)

            const imgSpan = document.createElement('img')
			imgSpan.src = image
			li.appendChild(imgSpan)

			
		})
		
	}
    displayMenu(await getMenu())


    

    const displayEvents = events => {
		eventUl.innerHTML = ''
		events.forEach(({ id, name, location, date, hours }) => {
			const li = document.createElement('li')
			eventUl.appendChild(li)

			const nameSpan = document.createElement('span')
			nameSpan.textContent = name
			li.appendChild(nameSpan)

            const locationSpan = document.createElement('span')
			locationSpan.textContent = location
			li.appendChild(locationSpan)

            const dateSpan = document.createElement('span')
			dateSpan.textContent = date
			li.appendChild(dateSpan)

            const hoursSpan = document.createElement('span')
			hoursSpan.textContent = hours
			li.appendChild(hoursSpan)
            

			
		})
		
	}

    displayEvents(await getEvents())

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
