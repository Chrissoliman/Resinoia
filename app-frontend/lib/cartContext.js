const { createContext, Children, useState, useEffect } = require("react");

export const CartContext = createContext({})

export default function CartContextProvider({children}) {

    const ls = typeof window !== 'undefined' ? window.localStorage : null

    const [cartProducts, setCartProducts] = useState([])

    useEffect(() => {
        if(cartProducts?.length > 0) {
            ls?.setItem('cart', JSON.stringify(cartProducts))
        }
    }, [cartProducts])

    useEffect(() => {
        if(ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')))
        }
    }, [])

    function addProduct(productId, letter = '', size = '', notes = '') {
        // Check if product with the same ID and options exists
        const existingProduct = cartProducts.find(item => item.productId === productId && item.letter === letter && item.size === size && item.notes === notes);

        if (existingProduct) {
            // If exists, increase quantity
            setCartProducts(prev => prev.map(item => {
                if (item.productId === productId && item.letter === letter && item.size === size && item.notes === notes) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            }));
        } else {
            // If not exists, add new product with options
            setCartProducts(prev => [...prev, { productId, quantity: 1, letter, size, notes }]);
        }
    }

    function removeProduct(productId, letter = '', size = '') {
                // Check if product with the same ID and options exists
                const existingProduct = cartProducts.find(item => item.productId === productId && item.letter === letter && item.size === size && item.notes === notes);

                if (existingProduct) {
                    // If exists, decrease quantity
                    setCartProducts(prev => prev.map(item => {
                        if (item.productId === productId && item.letter === letter && item.size === size && item.notes === notes) {
                            return { ...item, quantity: item.quantity - 1 };
                        }
                        return item;
                    }));
                } else {
                    // If not exists, remove product with options
                    setCartProducts(prev => prev.filter(item => !(item.productId === productId && item.letter === letter && item.size === size && item.notes === notes)));
                }
        
    }

    function clearCart() {
        ls.removeItem('cart')

        setCartProducts([])
    }

    return <>
    <CartContext.Provider value={{cartProducts, setCartProducts, addProduct, removeProduct, clearCart}}>
        {children}
    </CartContext.Provider>
    </>
}