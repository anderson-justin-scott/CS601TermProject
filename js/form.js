//jQuery for button and dialog widgets which pop up a window when form is submitted successfully
$(document).ready(function() {
	$("#submit").button();	
});//end ready

//creating functions which will validate the form fields
function validateForm(form) 
{	
	//creating array to store errors
	var errors = [];
	
	//assigning function to access DOM
	var $ = function(id) {
		return document.getElementById(id);
	};
	
	//assigning form field entries to variables using DOM
	var firstName = $("firstName").value;
	var lastName = $("lastName").value;
	var phoneNumber = $("phoneNumber").value;
	var email = $("email").value;

	//defining regular expressions used below
	//the first and last name name regular expressions allow only A-Z,a-z, and white space at a minimum length of 2 characters
	var firstNameRegEx = /[^\w ]|[\d_]|\b\w{1}\b/;
	var lastNameRegEx = /[^\w ]|[\d_]|\b\w{1}\b/;
	//matches a phone number separated by periods or dashes and handles parentheses around area codes, also allows US country code preceeded by an optional + symbol
	var phoneNumberRegEx = /\b\+?1?[-.()]?[-.()]?\d{3}[-.()]?[-.()]?\d{3}[-.]?\d{4}\b/; 
	/*matches multiple e-mail types, requires a minimum of one character before @ and allows underscores, alphanumeric, dashes, and
	 *and periods. Then accepts a one or more character domain name followed by a period, then two or more character alphanumeric generic top-level domains, case insensitive*/
	var emailRegEx = /[\w.-]+@\w+\.[\w.]{2,}/i; 
	
	//tests if first name field is empty, if not then it tests the string against the regular expression  
	if (firstName == "")
	{
		//pushes error entry into errors array which will be collected at the end
		errors.push("Enter your first name.");
	}
	
		//if not an empty field, tests the user input for first name against the firstName regular expression	
		else if (firstNameRegEx.test(firstName))
		{			
			errors.push("Please use only letters and spaces when typing your full first name.");	
		}
	
	//tests if last name field is empty, if not then it tests the string against the regular expression
	if (lastName == "")
	{
		errors.push("Enter your last name.");
	}
	
		//if not an empty field, tests the user input for last name against the lastName regular expression
		else if (lastNameRegEx.test(lastName))
		{
			errors.push("Please use only letters and spaces when typing your full last name.");			
		}
	
	//tests if phone number field is empty, if not then it tests the string against the phoneNumber regular expression
	if (phoneNumber == "")
	{
		errors.push("Enter your phone number.");	
	}
		
		//if not an empty field, tests the user input for phone number against the phoneNumber regular expression
		else if (!phoneNumberRegEx.test(phoneNumber))
		{
			errors.push("Please enter a valid 9 or 10 digit U.S. phone number.");	
		}	
	
	//tests if email field is empty, if not then it tests the string against the email regular expression
	if (email == "")
	{
		errors.push("Enter your e-mail address.");
	}	
		
		//if not an empty field, tests the user input for email against the email regular expression, some browsers validate email up to the @ sybmol, but this is more strict
		else if (!emailRegEx.test(email))
		{
			errors.push("Please enter a valid e-mail address.");
		}
	
	//the loop below reads back all the errors stored to the errors array to an alert and returns false to the function	
	if (errors.length > 0)
	{
		var errorMessage = "Please fix the following errors:\n\n";
		for (var index=0; index<errors.length; index++)
		{
			errorMessage+=errors[index] + "\n";
		}
		alert(errorMessage);
		return false;
	}	
	
	//successful validation on all fields will execute here   
	return true;	 	
}

// the functions below validate the input fields against a regex after a user clicks out of the field
function firstNameValidate()
{
	var field = document.getElementById("firstName");
	
	if (/[^\w ]|[\d_]|\b\w{1}\b/.test(field.value))
	{
		// sets border to red if user clicks out of box while input is incorrect
		field.style.border = "2px solid red";
	}	
		
	else
	{
		// once the user enters correctly formatted data into the field, the border clears
		field.style.border = "";
	}
}

function lastNameValidate()
{
	var field = document.getElementById("lastName");
	
	if (/[^\w ]|[\d_]|\b\w{1}\b/.test(field.value))
	{
		field.style.border = "2px solid red";
	}
	
	else
	{
		field.style.border = "";
	}	
}

function phoneNumberValidate()
{
	var field = document.getElementById("phoneNumber");
	
	if (!/\b\+?1?[-.()]?[-.()]?\d{3}[-.()]?[-.()]?\d{3}[-.]?\d{4}\b/.test(field.value))
	{
		field.style.border = "2px solid red";
	}
	
	else
	{
		field.style.border = "";
	}	
}

function emailValidate()
{
	var field = document.getElementById("email");
	
	if (!/[\w.-]+@\w+\.[\w.]{2,}/i.test(field.value))
	{
		field.style.border = "2px solid red";
	}
	
	else
	{
		field.style.border = "";
	}	
}