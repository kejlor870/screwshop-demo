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

    // id | name | type | price | description | filename
    $query = "
        SELECT products.id, products.name, products.type, products.price, products.description, product_images.filename
        FROM products
        LEFT JOIN (
            SELECT *
            FROM product_images
            WHERE id IN (
                SELECT MIN(id)
                FROM product_images
                GROUP BY product_id
            )
        ) AS product_images ON products.id = product_images.product_id;"
    ;
    
    // Send query to db
    $results = mysqli_query($conn, $query);
    if(!$results){
        die("Nie udalo sie pobrac danych: " . mysqli_error($conn));
    }

    // Making XML construction for AJAX
    header("Content-type: text/xml");
    echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
    echo "<Products>";
    while ($row = mysqli_fetch_assoc($results)) {
        echo "<Product>";
            echo "<Id>" . $row['id'] . "</Id>";
            echo "<Name>" . $row['name'] . "</Name>";
            echo "<Type>" . $row['type'] . "</Type>";
            echo "<Price>" . $row['price'] . "</Price>";
            echo "<Description>" . $row['description'] . "</Description>";
            echo "<Filename>" . $row['filename'] . "</Filename>";
        echo "</Product>";
    }
    echo "</Products>";

    mysqli_close($conn);
?>