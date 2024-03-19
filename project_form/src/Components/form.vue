<template>
 <form
    @submit.prevent="checkIfEmpty"
 >
      <div class="row">
        <div class="col-xl-12">
          <h1>Contact us</h1>
          <hr />
  
          <div class="mb-3">
            <label for="fname">Firstname</label>
            <input
              type="text"
              id="fname"
              class="form-control"
              v-model="formDatas.fname"
            />
            <p v-if="errors.fname" class="text-danger">{{ errors.fname }}</p>
          </div>
  
          <div class="mb-3">
            <label for="lastname">Lastname</label>
            <input
              type="text"
              id="lastname"
              class="form-control"
              v-model="formDatas.lname"
            />
            <p v-if="errors.lname" class="text-danger">{{ errors.lname }}</p>
          </div>

          <div class="mb-3">
            <label for="email">Email</label>
            <input
              type="text"
              id="email"
              class="form-control"
              v-model="formDatas.email"
            />
            <p v-if="errors.email" class="text-danger">{{ errors.email }}</p>
          </div>
  
          <div class="mb-3">
            <label for="message">Message</label>
            <textarea
              class="form-control"
              rows="3"
              id="message"
              v-model="formDatas.message"
            ></textarea>
          </div>
  
          <div class="mb-3">
              <h5>Want more informations about us? </h5>
              <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="Newsletter" id="newsletter"
                  v-model="formDatas.extras"
                  >
                  <label class="form-check-label" for="newsletter">
                      Newsletter
                  </label>
              </div>
              <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="Promotions" id="promotions"
                  v-model="formDatas.extras"
                  >
                  <label class="form-check-label" for="newsletter">
                      Promotions
                  </label>
              </div>
           </div>
  
           <div class="mb-3">
              <h5>What's your gender ? </h5>
              <div class="form-check">
                  <input class="form-check-input" type="radio" id="male" value="male" name="origin"
                  v-model="formDatas.gender"
                  >
                  <label class="form-check-label" for="male">
                      Male
                  </label>
              </div>
              <div class="form-check">
                  <input class="form-check-input" type="radio" id="Female" value="Female" name="origin"
                  v-model="formDatas.gender"
                  >
                  <label class="form-check-label" for="Female">
                      Female
                  </label>
              </div>
              <div class="form-check">
                  <input class="form-check-input" type="radio" id="unknown" value="unknown" name="origin"
                  v-model="formDatas.gender"
                  >
                  <label class="form-check-label" for="unknown">
                      I don't want to declare it!
                  </label>
              </div>
            </div>


            <button
                class="btn btn-primary"
            >
            Submit
            </button>
         
        </div>
      </div>
    </form>

</template>

<script setup>

    import { reactive,computed } from "vue";

    const errors=reactive({
        fname:"",
        lname:"",
        email:"",
    });
    const formDatas=reactive({
        fname:"",
        lname:"",
        email:"",
        message:"",
        extras:[],
        gender:"Male",
    })

    const validateName=(name,fieldName)=>{
        if(!name){
            return `${fieldName} is required`;
        }else if(isNaN(name)){
            return `${fieldName} can't be a number`;
        }else if(name.length<3){
            return `${fieldName} is too short`;
        }else if(name.length>20){
            return `${fieldName} is too long`;
        }
        return '';
    }
       

    const submitForm=()=>{
        localStorage.setItem("data", JSON.stringify(formDatas))
    }


    const checkIfEmpty=()=>{
        errors.fname=validateName(formDatas.fname, "Firstname");
        errors.lname=validateName(formDatas.lname, "Lastname");
        errors.email=validateEmail(formDatas.email);

        if(!errors.fname && !errors.lname && !errors.email){
            submitForm();
        }
    }

    const isValidEmail = (email) => {
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return validEmail.test(email);
    };

    const validateEmail=(email)=>{
        if(!email){
            return "Email is required";
        }else if (!isValidEmail(email)) {
             return "Invalid email format";
        }
        return "";
    };

</script>