<template>
  <div style="border: 3px dashed green">
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
    >
      <h1 class="h2">My Settings</h1>
    </div>

    <form @submit="checkForm">
      <div class="form-group">
        <label for="email">Email address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
      </div>
      <div class="form-group">
        <label for="firstName">First name</label>
        <input
          type="text"
          class="form-control"
          v-model="firstName"
          id="firstName"
          placeholder="Enter first name"
        />
      </div>
      <div class="form-group">
        <label for="lastName">Last name</label>
        <input
          type="text"
          class="form-control"
          v-model="lastName"
          id="lastName"
          placeholder="Enter last name"
        />
      </div>
      <div class="form-group">
        <label for="defaultCurrency">Default currency</label>
        <select
          class="form-control"
          id="defaultCurrency"
          v-model="defaultCurrency"
        >
          <option>€</option>
          <option>$</option>
          <option>¥</option>
          <option>£</option>
        </select>
      </div>
      <button class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  props: [],
  methods: {
    checkForm(e) {
      e.preventDefault();
    },
  },
  data() {
    return {
      email: "sample@example.com",
      firstName: "Sample",
      lastName: "Implementation",
      defaultCurrency: "€",
    };
  },
};
</script>
