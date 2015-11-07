$(document).ready(function(){

    getEmployees();

    $("#inputForm").submit(function(event) {
        event.preventDefault();
        generateEmployees();
    });

    $(".employeeList").on('click', '.delete', deleteEmployee);

    $(".employeeList").on('click', '.freeze', freezeEmployee);
});

function generateEmployees(){

    var values = {};

    $.each($("#inputForm").serializeArray(), function(i, field){
        values[field.name] = field.value;
    });

    console.log(values);

    $.ajax({
        type: "POST",
        url: "/generate",
        data: values,
        success: function(data) {
            console.log(data);
            getEmployees();
        }
    });
}

function deleteEmployee(){

    var deletedId = $(this).data("id");

    console.log("client deleteid: ",deletedId);

    $.ajax({
        type: "DELETE",
        url: "/delete" + deletedId,
        success: function(data) {
            console.log(data);
            getEmployees();
        }
    });
}

function getEmployees(){

    $.ajax({
        type: "GET",
        "url": "/data",
        success: function(data){
            console.log(data);
            appendEmployeesToDom(data);
        }
    });
}

function freezeEmployee(){

    var freezeId = {id: $(this).data("id")};

    console.log("client freeze id: ",freezeId);

    $.ajax({
        type: "PUT",
        url: "/freeze",
        data: freezeId,
        success: function(data) {
            getEmployees();
        }
    });
}

function appendEmployeesToDom(employeeArray){
    var totalSalary = 0;
    var averageSalary = 0;
    var totalYearsOfService = 0;
    var averageYearsOfService = 0;
    var unfrozenCount = 0;

    $(".employeeList").empty();
    for (var i = 0; i < employeeArray.length; i++) {
        var obj = employeeArray[i];
        var el = "<div class='empcontainer well col-md-3'>"+
            "<p>" + obj.name + "</p>" +
                "<p>Salary: " + obj.salary + "</p>" +
                "<p>Years of Service: " + obj.yearsOfService + "</p>" +
                "<p>Gender: " + obj.gender + "</p>" +
                "<p>Job Level: " + obj.jobLevel + "</p>" +
                "<p>Frozen: " + obj.isFrozen + "</p>"+
            "<button class='delete btn btn-danger' data-id='" + obj._id + "'>Delete</button>" +
            "<button class='freeze btn btn-info' data-id='" + obj._id + "'>Freeze</button>" +
            "</div>";
        $(".employeeList").append(el)

        if (!obj.isFrozen) {
            unfrozenCount++;
            totalSalary += parseInt(obj.salary);
            totalYearsOfService += parseInt(obj.yearsOfService);
        }
    }

    averageSalary = totalSalary/unfrozenCount;
    averageYearsOfService = totalYearsOfService/unfrozenCount;

    console.log(totalSalary, averageSalary, totalYearsOfService, averageYearsOfService);
    var elcalc = "<div class='calccontainer well col-md-3'>"+
        "<p>Total Salary: " + totalSalary + "</p>" +
        "<p>Average Salary: " + averageSalary + "</p>" +
        "<p>Total Years of Service: " + totalYearsOfService + "</p>" +
        "<p>Average Years of Service: " + averageYearsOfService + "</p>" +
        "</div>";
    $(".employeeCalculations").empty();
    $(".employeeCalculations").append(elcalc);

}