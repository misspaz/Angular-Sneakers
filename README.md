# ¡Hola! Esta son las instrucciones del proyecto final de Angular:

-> Ejecutar el db.json (no pudimos usar finalmente la apifakestore y tiramos de json-server) con json-server --watch db.json --port 3000

-> Iniciar el proyecto con ng serve --o

-> La página http://localhost:4200/products es la home donde están los productos de la tienda, podéis borrarlos con la "X", editarlos haciendo click en "Edit" y también añadirlos al carrito con "add to cart". Después de añadir uno o varios productos podéis hacer click en el carrito para ver el listado de zapatillas antes de hacer el checkout (no lo tiene incluido).

-> En la barra de búsqueda podéis buscar por categoría, probad con "man" o "woman".

-> En la barra superior hay un icono de perfil que tiene un enlace a la página de registro donde puedes registrate (funciona, comprobad la consola) y si ya tienes cuenta puedes hacer click en "Log in" y entrar con estos datos de prueba:

Email: kevin@gmail.com
Password: kev02937@

Comprobad la consola que diga "you are logged!" y el token que se genera uno temporalmente en localStorage.

Por último, tenemos un registro de usuarios con los detalles de cada usuario, por el momento no están linkados a ninguna parte pero la ruta es esta:
http://localhost:4200/users/users

-> Se ha utilizado ngbootstrap porque Angular Material al principio nos funcionó pero luego nos dio error por manejar scss cuando el proyecto lo habíamos configurado con CSS.

¡Gracias por ver el proyecto! :)