<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
// Datos de conexión a la base de datos
$servername = "localhost"; // Cambia esto si tu servidor MySQL está en otro lugar
$username = "root"; // Tu nombre de usuario de MySQL
$password = "admin"; // Tu contraseña de MySQL
$database = "agenciajexxy_bdcompraahora"; // Nombre de tu base de datos
$table = "usuario"; // Nombre de la tabla que deseas listar

// Parámetro para buscar un usuario específico (por ejemplo, por ID)
$email = $_GET['Email']; // Debes pasar el ID del usuario como parámetro en la URL
$userPassword = $_GET['Password'];

// Crear conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error en la conexión a la base de datos: " . $conn->connect_error);
}

$sql = "SELECT * FROM $table WHERE Email = $email";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    // Verificar si la contraseña proporcionada coincide con la contraseña almacenada (debe aplicarse una función de hashing adecuada)
    if ( $userPassword == $user['Password']) {
        // Convertir los datos del usuario en formato JSON y devolverlos
        header('Content-Type: application/json');
        echo json_encode($user);
    } else {
        echo "Contraseña incorrecta.";
    }
} else {
    echo "Usuario no encontrado.";
}

// Cerrar la conexión
$conn->close();
?>