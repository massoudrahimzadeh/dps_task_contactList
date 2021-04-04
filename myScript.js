// console.log("it is connected");

var user = "";
var contacts = [];
var myContactList = {};
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

if(loginBtn){
  loginBtn.addEventListener("click", ()=> {

        user = username.value;
        localStorage.setItem("username" , user);

  });
}

if(submitBtn) {

  submitBtn.addEventListener("click", () => {

    user = localStorage.getItem("username");
    var contact = {};
    var storedContacts = [];
    var firstname = document.getElementById("firstname").value;
    var familyname = document.getElementById("familyname").value;
    var email = document.getElementById("email").value;
    contact = {
      "firstname" : firstname,
      "familyname"  : familyname,
      "email" : email
    };

    if(firstname.length == 0 || familyname.length == 0 || email.length == 0){
      alert("Please fill up the form completely!");
    }else if(localStorage.getItem(user) === null){

        storedContacts.push(contact);
        localStorage.setItem(user, JSON.stringify(storedContacts));
        alert("Thanks for adding your first contact")
      }else{
        storedContacts = JSON.parse(localStorage.getItem(user));
        var isExisted = false;

        for(var i=0; i<storedContacts.length; i++){

          var savedContact = storedContacts[i];
          var emailInStorage = savedContact['email'];
          if(emailInStorage === email){

            localStorage.setItem(user, JSON.stringify(storedContacts));
            alert("this contact is already existed");
            isExisted = true;
            break;
          }
        }
        if(!isExisted){
            storedContacts.push(contact);
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
    var storedContacts = [];
    var savedContact = {};
    storedContacts = JSON.parse(localStorage.getItem(user));
    var table = document.getElementById('contact-table');
    alert(storedContacts.length);
    for(var i = 0; i < storedContacts.length; i++){

      var savedContact = storedContacts[i];

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
        if(newFirstName)alert("I am here");
        var index = this.parentNode.parentNode.rowIndex;
          var firstNameInCurrentRow = document.getElementById("contact-table").rows[index].cells[0].innerText;
          alert(firstNameInCurrentRow);
          var lastNameInCurrentRow = document.getElementById("contact-table").rows[index].cells[1].innerHTML;
          var emailInCurrentRow = document.getElementById("contact-table").rows[index].cells[2].innerHTML;
          newFirstName.value = firstNameInCurrentRow;
          newLastName.value = lastNameInCurrentRow;
          newEmail.value = emailInCurrentRow;
      };

      currentDeleteBtnInside.id = 'cl-delete';
      currentDeleteBtnInside.onclick = function(){
          alert("the btn is visibla");
          var index = this.parentNode.parentNode.rowIndex;
          alert(index);
          var emailInCurrentRow = document.getElementById("contact-table").rows[index].cells[2].innerHTML;
          alert(emailInCurrentRow);
          user = localStorage.getItem("username");
          var storedContacts = [];
          var savedContact = {};
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

function fillTheEditForm(){

      if (newFirstName.length) {
        alert("heyooooo");
        newFirstName.innerText = firstNameInCurrentRow;
        newLastName.innerText = lastNameInCurrentRow;
        newEmail.innerText = emailInCurrentRow;

      } else {
        setTimeout(fillTheEditForm, 300); // try again in 300 milliseconds
      }
}
