var vUrlPacientes = "http://127.0.0.1:5000/Pacientes";

$(document).ready(function (e) {
    carregarPacientes();
});

function carregarPacientes() {
    $.ajax({
        url: vUrlPacientes,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        cache: false,
        success: function (data) {
            var sel = $("#dadosPaciente");
            sel.empty();
            data['Pacientes'].forEach(e => {
                sel.append('<tr><td>' + e.name + '</td><td>' + e.age + '</td><td>' + retornaSexStrnig(e.sex) + '</td><td>' + e.Chest_pain_type + '</td><td>' + e.BP + '</td><td>' + e.Cholesterol + '</td><td>' + e.FBS_over_120 + '</td><td>' + e.EKG_results + '</td><td>' + e.Max_HR + '</td><td>' + e.Exercise_angina + '</td><td>' + e.ST_depression + '</td><td>' + e.Slope_of_ST + '</td><td>' + e.Number_of_vessels_fluro + '</td><td>' + e.Thallium + '</td><td>' + e.Heart_Disease + '</td></tr>')

            });

        },
        error: function () {
            console.log("Ocorreu um erro: " + dataType);
        }
    });
}

$('#btnCadPacientes').on('click', function (e) {

    var vData = {
        name: $("#formCadPacientes #name").val(),
        age: $("#formCadPacientes #age").val(),
        sex: $("#formCadPacientes #Sex").val(),
        BP: $("#formCadPacientes #BP").val(),
        Chest_pain_type: $("#formCadPacientes #Chest_pain_typ").val(),
        Cholesterol: $("#formCadPacientes #Cholesterol").val(),
        EKG_results: $("#formCadPacientes #EKG_results").val(),
        Exercise_angina: $("#formCadPacientes #Exercise_angina").val(),
        FBS_over_120: $("#formCadPacientes #FBS_over_120").val(),
        Max_HR: $("#formCadPacientes #Max_HR").val(),
        Number_of_vessels_fluro: $("#formCadPacientes #Number_of_vessels_fluro").val(),
        ST_depression: $("#formCadPacientes #ST_depression").val(),
        Slope_of_ST: $("#formCadPacientes #Slope_of_ST").val(),
        Thallium: $("#formCadPacientes #Thallium").val()
    };

    console.log(JSON.stringify(vData));
    $.ajax({
        url: vUrlPacientes,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(vData),
        success: function (d) {
            carregarPacientes()
            $('#formCadPacientes').val("")
            alertas('Paciente cadastrado com sucesso', '#modCadSecao', 'alert_sucess');
        },
        error: function (d) {
            alertas(d.responseJSON['msg'], '#modCadSecao', 'alert_danger');
        }
    }
    );
});

function retornaSexStrnig(i) {
    if (i == 0)
        return "Feminino"
    else
        return "Masculino"
}