<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Details</title>

<script type="text/javascript"  src="http://localhost:8080/Omms/js/test.js"></script>

</head>
<body>
<h1>Guru Register Form</h1>
<form name="frm01" action="#" method="post">

    <TABLE id="tblData" width="300px" border="0">
        <tr>
            <td></td>
            <td><b>Car</b>
            </td>
            <td><b>Group</b>
            </td>
            <td> <input type="hidden" id="somediv" /></td>
            <td><INPUT type="button" value="Add Row"
                onclick="addRow('tblData')" /></td>
        </tr>
    </TABLE>

    <br> <input type="submit" value="submit" name="submit">

</form>
</body>
</html>