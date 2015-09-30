<?php
if (isset($_POST['submit'])) {
  if (empty($_POST['username']) || empty($_POST['password']))
    @$error = "Debes introducir un nombre de usuario y una contrase&ntilde;a";
  else {
    if ($usuarios == "") {
      @$error = "Usuario o contrase&ntilde;a no v&aacute;lidos!";
    }
  }
}

?>

<!DOCTYPE html>
<html>
<head>
  <title>Codelse</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" href="images/favicon_32x32.ico" type="image/x-icon">
  <link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css" />
  <script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
  <script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
  <!-- <link rel="stylesheet" href="css/index.css"> -->

</head>

<body>
  <div data-role="page" data-theme="b" id='login'>
    <div data-role="header" data-position="fixed" data-theme="b" align="center">
      <img src="include/logo.png" height="50" width="165" alt="main logo" vspace="2"/>
    </div>
    <div data-role="content" class='login_prin' data-theme="b">
     <form id="check-user" action="index.php" method="post" class="ui-body ui-body-a ui-corner-all" data-ajax="false">
      <fieldset>
        <div data-role="fieldcontain">
          <label for="username">Usuario:</label>
          <input type="text" value="" name="username" id="username"/>
        </div>
        <div data-role="fieldcontain">
          <label for="password">Password:</label>
          <input type="password" value="" name="password" id="password"/>
        </div>
        <input type="submit" data-theme="b" name="login" id="login" value="Acceder">
      </fieldset>
    </form>
    <span class="error_form" style="color:red;"><?php echo @$error; ?></span>
  </div>
  <div data-role="footer" style='color: #1d1d1d'>...</div>
</div>
</body>
</html>