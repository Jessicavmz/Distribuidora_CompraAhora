<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");

// Datos de conexión a la base de datos
$servername = "localhost"; // Cambia esto si tu servidor MySQL está en otro lugar
$username = "root"; // Tu nombre de usuario de MySQL
$password = "admin"; // Tu contraseña de MySQL
$database = "agenciajexxy_bdcompraahora"; // Nombre de tu base de datos
$table = "catalogo"; // Nombre de la tabla que deseas listar

// Valor por el cual deseas filtrar los productos
$IdProveedorTabla = "IdProveedor";
$IdProveedor = $_GET['IdProveedor'];

// Crear conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error en la conexión a la base de datos: " . $conn->connect_error);
}

// Construir la consulta SQL
if ($IdProveedor === null) {
    // If IdProveedor is null, select all records without filtering
    $sql = "SELECT * FROM $table";
} else {
    // If IdProveedor is provided, filter by it
    $sql = "SELECT * FROM $table WHERE $IdProveedorTabla = '$IdProveedor'";
}

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Crear un arreglo para almacenar los datos
    $data = array();

    while ($row = $result->fetch_assoc()) {
        // Agregar cada fila como un elemento al arreglo
        $data[] = $row;
    }

    // Convertir el arreglo a formato JSON
    $json_data = json_encode($data);

    // Imprimir los datos en formato JSON
    echo $json_data;
} else {
    echo json_encode(array("message" => "No se encontraron registros en la tabla."));
}

// Cerrar la conexión
$conn->close();
?>
