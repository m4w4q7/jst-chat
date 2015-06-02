$(function() {
	'use strict';

	var registerForm = $('#register-form');
	registerForm.on('submit', function(event) {
		var username = $('#register-username');
		var password = $('#register-password');
		var confirmPassword = $('#register-confirm-password');

		event.preventDefault();

		if (password.val() !== confirmPassword.val()) {
			window.alert('Password does not match!');
			return;
		}

		$.ajax({
			url: 'api/register',
			method: 'POST',
			data: {
				username: username.val(),
				password: CryptoJS.SHA256(password.val()).toString()
			},
			success: function(data) {
				if (!data.success) {
					window.alert(data.message);
					return;
				}

				$('#register-modal').modal('hide');
				password.val('');
				confirmPassword.val('');
				window.alert('Registered successfully!');

			}
		});

	});
});