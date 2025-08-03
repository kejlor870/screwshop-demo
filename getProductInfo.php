<?php
    $dbhost = "localhost";
    $dbname = "warehouse_nuts";
    $dbuser = "root";
    $dbpass = "";

    $conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
    if(!$conn){
        die("Blad polaczenia: " . mysqli_connect_error());
    }
    mysqli_set_charset($conn, "utf8");

    // Get form link name of selected item
    $selectedItem = $_GET['selectedItem'];

    // Select product info
    $query = "
        SELECT 
            p.id AS product_id,
            p.name,
            p.type,
            p.quantity,
            p.price,
            p.description,
            pi.filename AS image_filename
        FROM products p
        LEFT JOIN product_images pi ON p.id = pi.product_id
        WHERE p.type = '".$selectedItem."';"
    ;

    // Send query to db
    $results = mysqli_query($conn, $query);
    if(!$results){
        die("Nie udalo sie pobrac danych: " . mysqli_error($conn));
    }

    // Product object
    $product = null;

    // adding info about product into object
    while ($row = mysqli_fetch_assoc($results)) {
        if ($product === null) {
            // Only for first row
            $product = [
                'id' => $row['product_id'],
                'name' => $row['name'],
                'type' => $row['type'],
                'quantity' => $row['quantity'],
                'price' => $row['price'],
                'description' => $row['description'],
                'images' => []
            ];
        }

        // adding imgs to array
        if (!empty($row['image_filename'])) {
            $product['images'][] = $row['image_filename'];
        }
    }

    // Making XML construction for AJAX
    header("Content-type: text/xml");
    echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
    echo "<Nuts>";
        echo "<Nut>";
            echo "<Name>" . $product['name'] . "</Name>";
            echo "<Type>" . $product['type'] . "</Type>";
            echo "<Quantity>" . $product['quantity'] . "</Quantity>";
            echo "<Price>" . $product['price'] . "</Price>";
            foreach($product['images'] as $dbImgSrc){
                echo "<Img>" . $dbImgSrc . "</Img>";
            }
            echo "<Description>" . $product['description'] . "</Description>";
        echo "</Nut>";
    echo "</Nuts>";

    // if ($product) {
    //     echo '<pre>';
    //     print_r($product);
    //     echo '</pre>';
    // } else {
    //     echo "Produkt nie znaleziony.";
    // }

    mysqli_close($conn);
?>