(async () => {
    // Menu 
    const button = document.querySelector('#menu-button')
    const nameInput = document.querySelector('#name-input')
    const priceInput = document.querySelector('#price-input')
    const descriptionInput = document.querySelector('#description-input')
    const imageInput = document.querySelector('#image-input')
    const menuUl = document.querySelector('#menu-list')

    // Update Menu Item 
    const updateMenuItemForm = document.querySelector('#updateMenuItem')
    const itemIdInput = document.querySelector('#itemId')
    const newItemNameInput = document.querySelector('#newItemName')
    const newItemPriceInput = document.querySelector('#newItemPrice')
    const newItemDescriptionInput = document.querySelector('#newItemDescription')

    // Delete Menu Item 
    const deleteMenuItemForm = document.querySelector('#deleteMenuItem')
    const deleteItemIdInput = document.querySelector('#deleteItemId')

    //Event 
    const eventUl = document.querySelector('#event-list')

    // Add Event 
    const addEventForm = document.querySelector('#addEvent')
    const eventNameInput = document.querySelector('#eventName')
    const eventDateInput = document.querySelector('#eventDate')
    const eventLocationInput = document.querySelector('#eventLocation')

    // Update Event 
    const updateEventForm = document.querySelector('#updateEvent')
    const eventIdInput = document.querySelector('#eventId')
    const newEventNameInput = document.querySelector('#newEventName')
    const newEventDateInput = document.querySelector('#newEventDate')
    const newEventLocationInput = document.querySelector('#newEventLocation')

    // Delete Event 
    const deleteEventForm = document.querySelector('#deleteEvent')
    const deleteEventIdInput = document.querySelector('#deleteEventId')
    

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


    updateMenuItemForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const itemId = itemIdInput.value
        const newItemName = newItemNameInput.value
        const newItemPrice = newItemPriceInput.value
        const newItemDescription = newItemDescriptionInput.value
    
        await fetch(`/api/menu/${itemId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newItemName, price: newItemPrice, description: newItemDescription })
        })
    
        itemIdInput.value = ''
        newItemNameInput.value = ''
        newItemPriceInput.value = ''
        newItemDescriptionInput.value = ''
    
        displayMenu(await getMenu())
      })

      deleteMenuItemForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const itemId = deleteItemIdInput.value
    
        await fetch(`/api/menu/${itemId}`, {
          method: 'DELETE'
        })
    
        deleteItemIdInput.value = ''
    
        displayMenu(await getMenu())
      })
    

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


  updateEventForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const eventId = eventIdInput.value
    const newEventName = newEventNameInput.value
    const newEventDate = newEventDateInput.value
    const newEventLocation = newEventLocationInput.value

    await fetch(`/api/events/${eventId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newEventName, date: newEventDate, location: newEventLocation })
    })

    eventIdInput.value = ''
    newEventNameInput.value = ''
    newEventDateInput.value = ''
    newEventLocationInput.value = ''

    displayEvents(await getEvents())
  })

	//add event on button click
addEventForm.addEventListener('click', async () => {
        const data = {
            name: eventNameInput.value,
            date: eventDateInput.value,
            location: eventLocationInput.value,
        }
        const response = await fetch('/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( data )
        })

        eventNameInput.value = ''
        eventDateInput.value = ''
        eventLocationInput.value = ''
        displayMenu(await getEvents())
    })
	
  deleteEventForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const eventId = deleteEventIdInput.value

    await fetch(`/api/events/${eventId}`, {
      method: 'DELETE'
    })

    deleteEventIdInput.value = ''

    displayEvents(await getEvents())
  })

  displayMenu(await getMenu())
  displayEvents(await getEvents())
})()
