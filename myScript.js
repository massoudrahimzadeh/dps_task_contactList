// console.log("it is connected");

var user = "";
var storedContacts = [];
var savedContact = {};
var submitBtn = document.getElementById("submitBtn");
var username = document.querySelector("#username");
var loginBtn = document.querySelector("#loginBtn");
var goToListBtn = document.getElementById("goToListBtn");
var showContacts = document.getElementById("showContacts");
var deleteBtn = document.getElementById('cl-delete');
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var newFirstName = document.getElementById("newFirstName");
var newLastName = document.getElementById("newLastName");
var newEmail = document.getElementById("newEmail");
var submitEditBtn = document.getElementById("submitEditBtn");
var table = document.getElementById("contact-table");

if(loginBtn){
  loginBtn.addEventListener("click", ()=> {

        user = username.value;
        localStorage.setItem("username" , user);

  });
}

if(submitBtn) {

  submitBtn.addEventListener("click", () => {

    user = localStorage.getItem("username");
    var firstname = document.getElementById("firstname").value;
    var familyname = document.getElementById("familyname").value;
    var email = document.getElementById("email").value;
    savedContact = {
      "firstname" : firstname,
      "familyname"  : familyname,
      "email" : email
    };

    if(firstname.length == 0 || familyname.length == 0 || email.length == 0){
      alert("Please fill up the form completely!");
    }else if(localStorage.getItem(user) === null){

        storedContacts.push(savedContact);
        localStorage.setItem(user, JSON.stringify(storedContacts));
        alert("Thanks for adding your first contact")
      }else{
        storedContacts = JSON.parse(localStorage.getItem(user));
        var isExisted = false;

        for(var i=0; i<storedContacts.length; i++){

          var contact = storedContacts[i];
          var emailInStorage = contact['email'];
          if(emailInStorage === email){

            localStorage.setItem(user, JSON.stringify(storedContacts));
            alert("this contact is already existed");
            isExisted = true;
            break;
          }
        }
        if(!isExisted){
            storedContacts.push(savedContact);
            localStorage.setItem(user, JSON.stringify(storedContacts));
            alert("The contact added to your contact list");

        }
      }
  });
}
// -------------------------------------------------------------------------------------------------------
if(showContacts){
  showContacts.addEventListener("click", displayContacts);
}

function displayContacts(){
    user = localStorage.getItem("username");
    storedContacts = JSON.parse(localStorage.getItem(user));

    while (table.rows.length > 1) {
    table.deleteRow(1);
    }

    for(var i = 0; i < storedContacts.length; i++){

      savedContact = storedContacts[i];
      var currentRow = table.insertRow(-1);
      var currentNameCol = currentRow.insertCell(0);
      var currentFamilyNameCol = currentRow.insertCell(1);
      var currentEmailCol = currentRow.insertCell(2);
      var currentEditBtn = currentRow.insertCell(3);
      var currentEditBtnInside = document.createElement("BUTTON");
      var currentDeleteBtn = currentRow.insertCell(4);
      var currentDeleteBtnInside = document.createElement("BUTTON");

      currentRow.id = 'cl-table-row';
      currentNameCol.id = 'cl-name';
      currentFamilyNameCol.id = 'cl-familyName';
      currentEmailCol.id = 'cl-email';
      currentEditBtnInside.id = 'cl-edit';
      currentEditBtnInside.onclick = function(){
        modal.style.display = "block";
        var index = this.parentNode.parentNode.rowIndex;
        localStorage.setItem('index', JSON.stringify(index));

        var firstNameInCurrentRow = document.getElementById("contact-table").rows[index].cells[0].innerText;
        var lastNameInCurrentRow = document.getElementById("contact-table").rows[index].cells[1].innerHTML;
        var emailInCurrentRow = document.getElementById("contact-table").rows[index].cells[2].innerHTML;

        newFirstName.value = firstNameInCurrentRow;
        newLastName.value = lastNameInCurrentRow;
        newEmail.value = emailInCurrentRow;
      };

      currentDeleteBtnInside.id = 'cl-delete';
      currentDeleteBtnInside.onclick = function(){

          var index = this.parentNode.parentNode.rowIndex;
          var emailInCurrentRow = document.getElementById("contact-table").rows[index].cells[2].innerHTML;

          user = localStorage.getItem("username");
          var indexInArray;
          storedContacts = JSON.parse(localStorage.getItem(user));
          for(var i=0; i<storedContacts.length; i++){
              savedContact = storedContacts[i];
              if(savedContact["email"] === emailInCurrentRow){
                  indexInArray = i;
              }
          }
          storedContacts.splice(indexInArray, 1);
          document.getElementById("contact-table").deleteRow(index);
          localStorage.setItem(user, JSON.stringify(storedContacts));
          // displayContacts();

      };

      currentNameCol.innerHTML = savedContact['firstname'];
      currentFamilyNameCol.innerHTML = savedContact['familyname'];
      currentEmailCol.innerHTML = savedContact['email'];
      currentDeleteBtnInside.innerHTML = '<i class="fas fa-dumpster"></i>';
      currentEditBtnInside.innerHTML = '<i class="fas fa-user-edit"></i>';

      currentRow.appendChild(currentNameCol);
      currentRow.appendChild(currentFamilyNameCol);
      currentRow.appendChild(currentEmailCol);
      currentRow.appendChild(currentEditBtn);
      currentRow.appendChild(currentDeleteBtn);
      currentEditBtn.appendChild(currentEditBtnInside);
      currentDeleteBtn.appendChild(currentDeleteBtnInside);
    }
}
if(span){
    span.onclick = function() {
      modal.style.display = "none";
    }
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

if (submitEditBtn){
    submitEditBtn.onclick = function(){

      var index = JSON.parse(localStorage.index);
      var emailInCurrentRow = document.getElementById("contact-table").rows[index].cells[2].innerHTML;
      var lastNameInCurrentRow = document.getElementById("contact-table").rows[index].cells[1].innerHTML;
      var firstNameInCurrentRow = document.getElementById("contact-table").rows[index].cells[0].innerHTML;


      user = localStorage.getItem("username");
      var indexInArray = 0;
      storedContacts = JSON.parse(localStorage.getItem(user));
      for(var i=0; i<storedContacts.length; i++){
          savedContact = storedContacts[i];
          if(savedContact["email"] === emailInCurrentRow){
              indexInArray = i;
          }
      }
        var updatedFirstName = newFirstName.value;
        var updatedLastName = newLastName.value;
        var updatedEmail="";
         if(emailInCurrentRow != newEmail.value){
                 for(var i=0; i<storedContacts.length; i++){
                     savedContact = storedContacts[i];
                     if(newEmail.value === savedContact["email"]){
                         updatedEmail = emailInCurrentRow;
                         alert("This email already exists");
                         break;
                     }else updatedEmail = newEmail.value;
                  }
               }else updatedEmail = newEmail.value;

      var editedContact = {
                "firstname" : updatedFirstName,
                "familyname"  : updatedLastName,
                "email" : updatedEmail
              };

      storedContacts[indexInArray] = editedContact;
      localStorage.setItem(user, JSON.stringify(storedContacts));
      modal.style.display = "none";
      displayContacts();

    }
}
