<?php
// performing server-side validation to strip any potentially malicious code
// initializing variables with blank string
$firstName = $lastName = $phoneNumber = $email = $marketing = $comments = "";
$firstNameErr = $lastNameErr = $phoneNumberErr = $emailErr =  "";

// server login info
$servername = "localhost";
$username = "justincs_db";
$password = "curtis77@";
$dbname = "justincs_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  
  // tests two optional fields
  $marketing = test_input($_POST["marketing"]);
  $comments = test_input($_POST["comments"]);
  
  // checks for empty string in required fields	
  if (empty($_POST["firstName"])) {
    $firstNameErr = "First name is required";
  } else {
    $firstName = test_input($_POST["firstName"]);
     // check if name only contains letters and whitespace
     if (preg_match("/[^\w ]|[\d_]|\b\w{1}\b/",$firstName)) {
       $firstNameErr = "Only letters and white space allowed.";
     }
  }

  if (empty($_POST["lastName"])) {
    $lastNameErr = "Last name is required";
  } else {
    $lastName = test_input($_POST["lastName"]);
     // check if name only contains letters and whitespace
     if (preg_match("/[^\w ]|[\d_]|\b\w{1}\b/",$lastName)) {
       $lastNameErr = "Only letters and white space allowed.";
     }
  }

  if (empty($_POST["phoneNumber"])) {
    $phoneNumberErr = "Phone number is required";
  } else {
    $phoneNumber = test_input($_POST["phoneNumber"]);
	     // check if name only contains letters and whitespace
     if (!preg_match("/\b\+?1?[-.()]?[-.()]?\d{3}[-.()]?[-.()]?\d{3}[-.]?\d{4}\b/",$phoneNumber)) {
       $phoneNumberErr = "Please enter a valid 9 or 10 digit U.S. phone number.";
     }
  }
  
  if (empty($_POST["email"])) {
    $emailErr = "Email is required";
  } else {
    $email = test_input($_POST["email"]);
	     // check if name only contains letters and whitespace
     if (!preg_match("/[\w.-]+@\w+\.[\w.]{2,}/i",$email)) {
       $emailErr = "Please enter a valid e-mail address.";
     }
  }
}// end if  

// if input validation fails then the error is echoed to the user and connection is closed before data can be entered
if ($firstNameErr || $lastNameErr || $phoneNumberErr || $emailErr) {
	echo "You have an error. " . $firstNameErr . $lastNameErr . $phoneNumberErr . $emailErr;
	$conn->close();
}


// inserts form data into database 
$sql = "INSERT INTO TermProject (firstName, lastName, phoneNumber, email, marketing, comments)
VALUES ('$firstName', '$lastName', '$phoneNumber', '$email', '$marketing', '$comments')";

if ($conn->query($sql) === TRUE) {
    header('Location: http://www.justin.cs601.com/form_handler.html');
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
  


// strips any characters not caught by client-side validation
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
?>
