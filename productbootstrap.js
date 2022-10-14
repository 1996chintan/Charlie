 // Function of Data Table //
$(document).ready(function () {
   table = $('#Table').DataTable();
} );

 // Get Button Function //
function getButton(){
	return `
		<i class=" bi bi-pencil p-1" style="color:green"; aria-hidden="true" data-bs-toggle="modal" id="editForm"></i> 
		<i class=" bi bi-trash p-1" style="color:red"; id="deleteModal" data-bs-toggle="modal" data-bs-target="#deleteProductModal"></i>
		<i class=" bi bi-eye-fill p-1" style="color:blue"; id="editForm" data-bs-toggle="modal" data-bs-target="#productModal"></i>`;
}

// Add Data //
var i = 0;
function save() {
	i = i + 1;
	
	let productId = $("#productId").val().trim();
	let expiryDate = $("#expiryDate").val().trim();
	let productCategory = $("#productCategory").val().trim();
	let description = $("#description").val().trim(); 
	
	//let btnElements = getButton();
	
	var productvalid =  validateField('productId', 'errorProductId', 'Product Id');	
	var expiryDateValid = validateField('expiryDate', 'errorExpiryDate', 'Expiry Date');
	var productCategoryValid = validateField('productCategory', 'errorProductCategory', 'Product Category');
	var descriptionValid = validateField('description', 'errorDescription', 'Description');
	
	if (productvalid  && expiryDateValid && productCategoryValid  && descriptionValid ){
	
	const tr = $(`<tr id="Table${i}">
			<td>${productId}</td>
			<td>${expiryDate}</td>
			<td>${productCategory}</td>
			<td>${description}</td>
			<td>${getButton()}</td>
			</tr>`);
	table.row.add(tr[0]).draw();
	resetForm();  
}}

 // Delete Data //
 $("#Table").on("click", "#deleteModal", function() {
	let selectedRow = $(this).closest("tr");
	let data = selectedRow.attr("id");
	
	$("#deleteBtn").attr("onclick", "deleteProduct("+data+")");
});
 
 function deleteProduct(rowIdGet){
	let selected = $(rowIdGet).closest('tr').remove();
	let rowGet1 = $(selected).attr("id");
	
	table.row(selected).remove().draw();
	let row = $("#indexForm").val();

	if(rowGet1 == row) {
		resetForm();
	}
 };

 // Reset Data //
 function resetForm() {
	$("#button").text("Save");
	
	$("#productId").val("");
	$("#expiryDate").val ("");
	$("#productCategory").val("");
	$("#description").val("");
	
	$("#errorProductId").val("");
	$("#errorExpiryDate").val("");
	$("#errorProductCategory").val("");
	$("#errorDescription").val("");
	
	$(".errorForm").html("");
	$("#button").attr("onclick", "save()");
}

 //  Edit Data //
$("#Table").on("click", "#editForm", function() {
	resetForm();
	let selectedRow = $(this).closest("tr");
	let data = $(selectedRow).attr("id");

	$("#indexForm").val(data);
	
	$("#productId").val(selectedRow.find("td:eq(0)").text());
	$("#expiryDate").val(selectedRow.find("td:eq(1)").text());
	$("#productCategory").val(selectedRow.find("td:eq(2)").text());
	$("#description").val(selectedRow.find("td:eq(3)").text());
	
	$("#productIdModal").text(selectedRow.find("td:eq(0)").text());
	$("#expiryDateModal").text(selectedRow.find("td:eq(1)").text());
	$("#productCategoryModal").text(selectedRow.find("td:eq(2)").text());
	$("#descriptionModal").text(selectedRow.find("td:eq(3)").text());
	
	$("#button").text("Update");
	$("#button").attr("onclick", "updateForm("+data+")");
});
	
 // Update Data //	
function updateForm(rowIdget) {

	let rowSel = $(rowIdget).closest("tr");
	
	let productId = $("#productId").val().trim();	
	let expiryDate = $("#expiryDate").val().trim();
	let productCategory = $("#productCategory").val().trim();
	let description = $("#description").val().trim();
	
	var productValidUpdate =  validateField('productId', 'errorProductId', 'Product Id');	
	var expiryDateValidUpdate = validateField('expiryDate', 'errorExpiryDate', 'Expiry Date');
	var productCategoryValidUpdate = validateField('productCategory', 'errorProductCategory', 'Product Category');
	var descriptionValidUpdate = validateField('description', 'errorDescription', 'Description');
	
	if (productValidUpdate  && expiryDateValidUpdate && productCategoryValidUpdate  && descriptionValidUpdate ){
		
		table.row(rowIdget).data([productId, expiryDate, productCategory, description, getButton()]).draw();
			
		$(rowSel).find("td:eq(0)").text(productId);
		$(rowSel).find("td:eq(1)").text(expiryDate);
		$(rowSel).find("td:eq(2)").text(productCategory);
		$(rowSel).find("td:eq(3)").text(description);
			
		$("#button").text("Update");
		resetForm();
	}
}	

 // Validation Function //
function validateField(elementId, errorId, fieldName) {
	var isValid = false;
	let productData = $(`#${elementId}`).val().trim();

	if (productData == "") {
		$(`#${errorId}`).html("* " + fieldName + " must required.");
	} else {
		$(`#${errorId}`).html("");
		isValid = true;
	}
	return isValid;
}
