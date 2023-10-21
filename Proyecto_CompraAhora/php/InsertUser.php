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

// Obtener datos del nuevo usuario desde un formulario HTML
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["IdUser"], $_POST["Nombre"], $_POST["Password"], $_POST["Email"], $_POST["Estado"], $_POST["Roll"])) {
    $IdUser  = $_POST["IdUser"];
    $Nombre = $_POST["Nombre"];
    $Password = $_POST["Password"];
    $Email = $_POST["Email"];
    $Estado = $_POST["Estado"];
    $Roll = $_POST["Roll"];

    // Crear conexión
    $conn = new mysqli($servername, $username, $password, $database);

    // Verificar la conexión
    if ($conn->connect_error) {
        die(json_encode(["success" => false, "message" => "Error en la conexión a la base de datos: " . $conn->connect_error]));
    }

    // Validar si el ID ya está en uso
    $sql_check_id = "SELECT IdUser FROM $table WHERE IdUser = '$IdUser'";
    $result = $conn->query($sql_check_id);

    if ($result->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "El ID ya está en uso. Por favor, elige otro ID."]);
    } else {
        // Preparar la consulta SQL para insertar un nuevo usuario
        $sql_insert = "INSERT INTO $table (IdUser, Nombre, Password, Email, Estado, Roll) VALUES ('$IdUser', '$Nombre','$Password', '$Email', '$Estado', '$Roll')";

        if ($conn->query($sql_insert) === TRUE) {
            echo json_encode(["success" => true, "message" => "Nuevo usuario insertado correctamente."]);
        } else {
            echo json_encode(["success" => false, "message" => "Error al insertar el usuario: " . $conn->error]);
        }
    }

    // Cerrar la conexión
    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "No se proporcionaron datos de registro"]);
}
?>
