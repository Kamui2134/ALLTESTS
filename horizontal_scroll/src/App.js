import './App.css'
import { useEffect, useRef } from 'react'

function App() {
	const containerRef = useRef(null)
	let images = [
		'https://www.kaboompics.com/cache/f/2/2/a/8/f22a899603db7f76c5574e4f16f2a5a029727384.jpeg',
		'https://www.kaboompics.com/cache/a/e/2/3/5/ae235284fdd0cb2656331b37cbe9202326ef92b2.jpeg',
		'https://www.kaboompics.com/cache/3/a/f/0/0/3af0082bc46045dce6af86a0b9ef7360e8bcca83.jpeg',
		'https://www.kaboompics.com/cache/8/2/0/5/b/8205b5738781c30117823f89024bc31cb2a07076.jpeg',
	]

	const transform = section => {
		const offsetTop = section.parentElement.offsetTop
		const scrollSection = section.querySelector('.scroll-section')
		let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100
		scrollSection.style.transform = `translate3d(${-percentage}vw, 0, 0)`
	}

	useEffect(() => {
		if (containerRef.current == null) {
			return
		}
		const stickySections = containerRef.current.querySelectorAll('.sticky')
		images.forEach(img => {
			stickySections.forEach(section => {
				let image = document.createElement('img')
				image.src = img
				section.querySelector('.scroll-section').appendChild(image)
			})
		})
		window.addEventListener('scroll', e => {
			for (let i = 0; i < stickySections.length; i++) {
				transform(stickySections[i])
			}
		})
	}, [])

	return (
		<main className='app' ref={containerRef}>
			<section>
				<div className='container'>
					<h1>Hybrid Scroll</h1>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat.
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat.
					</p>
				</div>
			</section>
			<div className='sticky-parent'>
				<div className='sticky'>
					<div className='scroll-section'></div>
				</div>
			</div>
			<section>
				<div className='container'>
					<h1>About</h1>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat.
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat.
					</p>
				</div>
			</section>
			<div className='sticky-parent'>
				<div className='sticky'>
					<div className='scroll-section'></div>
				</div>
			</div>
			<section>
				<div className='container'>
					<h1>End</h1>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat.
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat.
					</p>
				</div>
			</section>
		</main>
	)
}

export default App
