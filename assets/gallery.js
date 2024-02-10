const listNavItems = document.querySelectorAll('.nav-item')
const listNavLinks = document.querySelectorAll('.nav-link')
const listImages = document.querySelectorAll('.gallery-item')
const modalContent = modalGalery.querySelector('#modalCarousel .carousel-inner')

/** Pause the carousel when the user clicks on the pause button **/
document.querySelector('.pause').addEventListener('click', function () {
	const carouselElement = document.getElementById('carouselExampleIndicators')
	const carouselInstance = bootstrap.Carousel.getInstance(carouselElement)
	carouselInstance.pause()
})

/** Filter elements by category on click event **/
function filterByCategory() {
	listNavLinks.forEach((navLink) => {
		navLink.addEventListener('click', (event) => {
			const filter = event.target.getAttribute('data-btnCategory')

			listNavLinks.forEach((navSpan) => {
				navSpan.classList.remove('active')
			})
			listNavItems.forEach((navItem) => navItem.classList.remove('active'))
			event.target.classList.add('active')
			event.target.parentElement.classList.add('active')

			for (let image of listImages) {
				if (filter !== image.dataset.bsCategory && filter !== 'all') {
					image.parentElement.classList.remove('visible')
					image.parentElement.classList.add('hidden')
				} else {
					image.parentElement.classList.remove('hidden')
					// remove the class to ensure that the animation can be replayed
					image.parentElement.classList.remove('visible')
					// force reflow/repaint to allow reanimation
					void image.parentElement.offsetWidth
					image.parentElement.classList.add('visible')
				}
			}
		})
	})
}

/**
 * Updates the modal content for the clicked image based on the active category.
 *
 * @param {Element} clickedImage - the image element that was clicked
 * @param {string} activeCategory - the active category for filtering images
 */
function updateModalForImage(clickedImage, activeCategory) {
	const clickedImageSrc = clickedImage.src

	for (let image of listImages) {
		if (activeCategory === image.dataset.bsCategory || activeCategory === 'all') {
			const modalImage = document.createElement('div')
			modalImage.classList.add('carousel-item')
			if (image.src === clickedImageSrc) {
				modalImage.classList.add('active')
			}
			const modalImg = document.createElement('img')
			modalImg.classList.add('d-block', 'w-100')
			modalImg.setAttribute('src', image.src)
			modalImg.setAttribute('alt', image.alt)
			modalImage.appendChild(modalImg)
			modalContent.appendChild(modalImage)
		}
	}
}
/**  Show the gallery modal and update it  **/
function showModalGalery() {
	const modalGalery = document.getElementById('modalGalery')

	modalGalery.addEventListener('show.bs.modal', function (event) {
		const clickedImage = event.relatedTarget
		const activeCategory = document.querySelector('.nav-link.active').getAttribute('data-btnCategory')
		updateModalForImage(clickedImage, activeCategory)
	})
}

/** Reset modal content when the modal is closed  **/
function closeModalGalery() {
	modalGalery.addEventListener('hidden.bs.modal', function () {
		modalContent.innerHTML = ''
	})
}

filterByCategory()
showModalGalery()
closeModalGalery()
