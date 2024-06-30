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

    // function addProduct(productId, letter = '', size = '', notes = '') {
    //     // Check if product with the same ID and options exists
    //     const existingProduct = cartProducts.find(item => item.productId == productId && item.letter == letter && item.size == size && item.notes == notes);
    //     console.log("Add Product Called with:", { productId, letter, size, notes });
    //     console.log("Current cart products:", cartProducts);
    //     console.log("Existing product:" , existingProduct)

    //     if (existingProduct) {
    //         // If exists, increase quantity
    //         setCartProducts(prev => prev.map(item => {
    //             if (item.productId == productId && item.letter == letter && item.size == size && item.notes == notes) {
    //                 return { ...item, quantity: item.quantity + 1 };
    //             }
    //             return item;
    //         }));
    //     } else {
    //         // If not exists, add new product with options
    //         setCartProducts(prev => [...prev, { productId, quantity: 1, letter, size, notes }]);
    //     }
    // }
    function addProduct(productId, letter = '', size = '', notes = '') {
        console.log("Add Product Called with:", { productId, letter, size, notes });
        console.log("Current cart products before update:", cartProducts);
    
        const existingProduct = cartProducts.find(item => 
          item.productId == productId && 
          item.letter == letter && 
          item.size == size && 
          item.notes == notes
        );
    
        console.log("Existing product:", existingProduct);
    
        if (existingProduct) {
          setCartProducts(prev => {
            const updatedCartProducts = prev.map(item => {
              if (item.productId === productId && item.letter === letter && item.size === size && item.notes === notes) {
                return { ...item, quantity: item.quantity + 1 };
              }
              return item;
            });
            console.log("Updated cart products:", updatedCartProducts);
            return updatedCartProducts;
          });
        } else {
          setCartProducts(prev => {
            const newCartProducts = [...prev, { productId, quantity: 1, letter, size, notes }];
            console.log("New cart products:", newCartProducts);
            return newCartProducts;
          });
        }
      }

    function removeProduct(productId, letter = '', size = '', notes = '') {
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