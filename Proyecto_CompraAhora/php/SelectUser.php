<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json"); // Establece el tipo de contenido como JSON

// Datos de conexión a la base de datos
$servername = "localhost"; // Cambia esto si tu servidor MySQL está en otro lugar
$username = "root"; // Tu nombre de usuario de MySQL
$password = "admin"; // Tu contraseña de MySQL
$database = "agenciajexxy_bdcompraahora"; // Nombre de tu base de datos
$table = "usuario"; // Nombre de la tabla que deseas listar

// Parámetros para buscar un usuario específico (por ejemplo, por Email)
$email = $_POST['Email']; // Debes pasar el Email del usuario en el cuerpo de la solicitud
$userPassword = $_POST['Password']; // Debes pasar la contraseña en el cuerpo de la solicitud

// Crear conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    $response = ["error" => "Error en la conexión a la base de datos: " . $conn->connect_error];
} else {
    $sql = "SELECT * FROM $table WHERE Email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Verificar si la contraseña proporcionada coincide con la contraseña almacenada (debe aplicarse una función de hashing adecuada)
        if ($userPassword === $user['Password']) {
            if("ACTV" == $user['Estado'])
            {
                $response = ["success" => true, "message" => "Inicio de sesión exitoso"];
            }
            else
            {
                $response = ["success" => false, "message" => "Usuario Descativado"];
            }
        } else {
            // Las credenciales son incorrectas
            $response = ["success" => false, "message" => "Credenciales incorrectas"];
        }
    } else {
        // El usuario no se encontró
        $response = ["success" => false, "message" => "Usuario no encontrado"];
    }
}

// Cerrar la conexión
$conn->close();

// Enviar la respuesta JSON al cliente
echo json_encode($response);
?>
