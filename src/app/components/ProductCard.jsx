import { useState } from "react"
import './ProductCard.css'

// Компонент карточки товара с кнопками добавления/изменения количества в корзине
function ProductCard({ product, addToCart, quantityInCart, updateQuantity }) {

    // Состояние для избранного
    const [isFavorite, setIsFavorite] = useState(false)

    // Состояние для карусели
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    // 1. Функция для перехода к следующей картинке
    const nextImage = () => {
        // Если картинка последняя, переходим на первую
        if (currentImageIndex === product.images.length - 1) {
            setCurrentImageIndex(0)
        }
        else {
            setCurrentImageIndex(currentImageIndex + 1)
        }
    }

    // 2. Функция для перехода к предыдущей картинке
    const prevImage = () => {
        // Если картинка первая, переходим на последнюю
        if (currentImageIndex === 0) {
            setCurrentImageIndex(product.images.length - 1)
        }
        else {
            setCurrentImageIndex(currentImageIndex - 1)
        }
    }

    return (
        <div className="product-card">
            {/* бейдж special offer */}
            {product.isSpecialOffer && (
                <span className="special-badge">Special Offer</span>
            )}

            {/* Контейнер для картинки и стрелок */}
            <div className="image-wrapper">
                <img
                    src={product.images[currentImageIndex]}
                    alt={product.model}
                    className="product-image"
                />

                {/* отображаем стрелки и индикатор, если картинок больше чем 1 */}
                {product.images.length > 1 && (
                    <>
                        <button className="arrow left" onClick={prevImage}>❮</button>
                        <button className="arrow right" onClick={nextImage}>❯</button>

                        {/* номер индикатора (1, 2, 3.. N) */}
                        <div className="counter-indicator">
                            {currentImageIndex + 1} / {product.images.length}
                        </div>
                    </>
                )}
            </div>

            {/* Кнопка "избранное" */}
            <button
                className="favorite-btn"
                onClick={() => setIsFavorite(!isFavorite)}
            >
                {isFavorite ? '❤️' : '🤍'}
            </button>

            {/* подписываем бренд, модель и цену */}
            <div className="product-info">
                <div className="brand">{product.make}</div>
                <h3 className="model">{product.model}</h3>
                <div className="price">${product.price.toLocaleString()}</div>
            </div>

            {/* кнопка корзина и область счетчика */}
            <div className="cart-container">
                {quantityInCart === 0 ? (
                    /* Когда корзина пуста, показываем кноппку "добавить"*/
                    <button
                        className="add-to-cart-btn"
                        onClick={() => addToCart(product.id)}
                    >
                        Add to Cart
                    </button>
                ) : (
                    /* товары есть, показываем счетчик */
                    <div className="cart-counter">
                        {/* кнопка минус (-)*/}
                        <button
                            className="counter-btn"
                            onClick={() => updateQuantity(product.id, -1)}
                        >
                            -
                        </button>
                        <span className="counter-text">{quantityInCart} in cart </span>
                        {/* кнопка плюс (+) */}
                        <button
                            className="counter-btn"
                            onClick={() => updateQuantity(product.id, 1)}
                        >
                            +
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductCard