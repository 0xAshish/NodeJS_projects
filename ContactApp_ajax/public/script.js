$(function () {
    //check if user is already logged in then don't show  login ragister page 

    $(document).ready(function () {
        $("#show").hide();
        $("#hide").hide();
        $("#page").show();
        $.ajax({
            url: '/app/valid',
            contentType: 'application/json',
            success: function (response, code) {
                console.log(response);
                console.log(code);
                if (response == "valid") {
                    console.log("login validation");
                    $("#show").show();
                    $('#Contacts').click();
                } else $("#hide").show();

            },
            statusCode: {
                500: function () {
                    console.log('500');
                    $("#show").hide();
                    $("#hide").show();
                }
            }
        });
    });
    // logout 
    $('#logout').on('click', function () {
        console.log('logout');
        $.ajax({
            url: '/app/logout',
            contentType: '/application/json',
            success: function () {
                $("#show").hide();
                $("#hide").show();

            }
        });
    });
    // load Contacts 
    $('#Contacts').on('click', function () {
        console.log("hello");
        $.ajax({
            url: '/app/contacts',
            contentType: 'application/json',
            success: function (response) {
                var contacts = $('contacts');
                console.log(response);
                contacts.html('');
                response.data.forEach(function (data) {
                    contacts.append('\
                             ' + data.first_name + ' ' + data.last_name + '<br/>\
                            <h3 id="email"> '+ data.email + '</h3><br/>\
                             '+ data.mobile + '<br/>\
                             <br/>\
                                <button id="delete-data" value="'+ data._id + '">DELETE</button>\
                               <br/>\
                    ');
                });
            }
        });
    });
    // delete any contact 
    $('#con').on('click', '#delete-data', function () {
        console.log("on click delete");
        var id = $(this).attr('value');
        $.ajax({
            url: '/app/delete/' + id + '',
            contentType: 'application/json',
            method: 'DELETE',
            success: function (response) {
                console.log(response);
                $('#Contacts').click();
            }
        });

    });
    // ragistration form  
    $('#ragister_').on('click', function () {

        console.log("ragister_form" + $('#email').val());
        var data = {
            first_name: $('#first_name').val(),
            last_name: $('#last_name').val(),
            email: $('#email').val(),
            mobile: $('#mobile').val(),
            password: $('#password').val()
        }

        $.ajax({
            url: '/user/ragister',
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify(data),//$("#register_form").serialize(),
            success: function (response) {
                console.log(response);

            }

        });


    });
    //login into app
    $('#login_').on('click', function () {

        console.log("login_form");
        var data = {
            username: $('#lemail').val(),
            password: $('#lpassword').val()
        }
        if (validate_login(data)) {
            $.ajax({
                url: '/user/login',
                contentType: 'application/json',
                method: 'POST',
                data: JSON.stringify(data),//$("#register_form").serialize(),
                success: function (response) {
                    console.log(response);
                    if (response == "fail") {
                        var loginmsg = $('loginmsg');
                        loginmsg.html('')
                        var msg = "password|| username incorrect<br/>";
                        loginmsg.append(msg);
                        console.log(msg);

                    } else {
                        $("#show").show();
                        $("#hide").hide();
                        $('#Contacts').click();
                    }
                },
                statusCode: {
                    500: function () {
                        console.log('500');
                        $("#show").hide();
                        $("#hide").show();
                    }
                }

            });
            $('#lemail').val("");
            $('#lpassword').val("");
        }
        else {
            var loginmsg = $('loginmsg');
            loginmsg.html('');
            var msg = "password|| username can't be blank<br/>";
            loginmsg.append(msg);
        }
    });

    // add new contact
    $('#add_contact').on('click', function () {
        console.log("add contact " + $('#con_email').val());
        var data = {
            first_name: $('#con_first_name').val(),
            last_name: $('#con_last_name').val(),
            email: $('#con_email').val(),
            mobile: $('#con_mobile').val(),
        }
        $.ajax({
            url: '/app/add',
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify(data),//$("#register_form").serialize(),
            success: function (response) {
                $('#Contacts').click();
                console.log(response);
            }
        });
        $('#con_first_name').val("");
        $('#con_last_name').val("");
        $('#con_email').val("");
        $('#con_mobile').val("");

    });
    //validate login 
    function validate_login(data) {
        if (data.username !== "" && data.password !== "") { return true; }
        else { return false };
    }
    // validate ragister
    function validate_ragister(data) {
        if (data.last_name !== "" && data.first_name !== "" && data.email !== "" && data.mobile !== "" && data.password !== "") return true;
        else return false;
    }

});
