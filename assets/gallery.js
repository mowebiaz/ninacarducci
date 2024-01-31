function filterByCategory() {
	const listNavLinks = document.querySelectorAll('.nav-link')
	const listNavItems = document.querySelectorAll('.nav-item')
	const listImages = document.querySelectorAll('.gallery-item')

	listNavLinks.forEach((navLink) => {
		navLink.addEventListener('click', (event) => {
			listNavLinks.forEach((navSpan) => navSpan.classList.remove('active'))
			listNavItems.forEach((navItem) => navItem.classList.remove('active'))
			event.target.classList.add('active')
			event.target.parentElement.classList.add('active')

			const filter = event.target.getAttribute('data-btnCategory')
			for (let image of listImages) {
				if (filter !== image.dataset.bsCategory && filter !== 'all') {
					image.parentElement.style.display = 'none'
				} else {
					image.parentElement.style.display = 'block'
				}
			}
			document.dispatchEvent(new Event('categoryChanged'))
		})
	})
}

function modalGalery() {
	const modalGalery = document.getElementById('modalGalery')

	document.addEventListener('categoryChanged', function () {
		const activeLink = document.querySelector('.nav-link.active')
		const activeCategory = activeLink.getAttribute('data-btnCategory')
	})

	modalGalery.addEventListener('show.bs.modal', function (event) {
		const activeLink = document.querySelector('.nav-link.active')
		const activeCategory = activeLink.getAttribute('data-btnCategory')
		// Button that triggered the modal
		const clickedImage = event.relatedTarget
		// Extract info from data-bs-* attributes
		const clickedImageSrc = clickedImage.src

		const modalContent = modalGalery.querySelector('#modalCarousel .carousel-inner')

		const listImages = document.querySelectorAll('.gallery-item') /* répétition */
		for (let image of listImages) {
			if (activeCategory === image.dataset.bsCategory || activeCategory === 'all') {
				const modalImage = document.createElement('div')
				modalImage.classList.add('carousel-item')
				if (image.src === clickedImageSrc) {
					modalImage.classList.add('active')
				}
				const modalImg = document.createElement('img')
				modalImg.classList.add('d-block', 'w-100') /* à revoir */
				/*modalImg.classList.add('img-fluid')*/
				modalImg.setAttribute('src', image.src)
				modalImg.setAttribute('alt', image.alt)
				modalImage.appendChild(modalImg)
				modalContent.appendChild(modalImage)
			}
		}

		console.log('modalContent', modalContent)

		// remettre à zéro qd on ferme la modale
		modalGalery.addEventListener('hide.bs.modal', function () {
			modalContent.innerHTML = ''
		})
	})
}

filterByCategory()
modalGalery()
