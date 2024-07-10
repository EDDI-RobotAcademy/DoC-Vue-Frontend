<template>
  <div class="container">
    <h1>Predict Product Category</h1>
    <form @submit.prevent="predict" class="form">
      <div class="form-group">
        <label for="age">Age:</label>
        <input type="number" v-model="age" class="input" required />
      </div>
      <div class="form-group">
        <label for="gender">Gender:</label>
        <select v-model="gender" class="input" required>
          <option value="남성">Male</option>
          <option value="여성">Female</option>
        </select>
      </div>
      <button type="submit" class="button">Predict</button>
    </form>
    <div v-if="prediction" class="result">
      <h2>Prediction Result</h2>
      <p>Predicted Category: {{ prediction.prediction }}</p>
      <p>Recommended IDs: {{ prediction['recommendProductIdList'].join(', ') }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      age: null,
      gender: '',
      prediction: null,
    };
  },
  methods: {
    async predict() {
      try {
        const response = await axios.post('http://192.168.0.49:33333/lgbm-predict', {
          age: this.age,
          gender: this.gender,
        });
        this.prediction = response.data;
      } catch (error) {
        console.error("Prediction failed:", error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

.input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
}

.button {
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}

.result {
  margin-top: 20px;
  padding: 15px;
  background: #e9f7ef;
  border-left: 5px solid #28a745;
}

.result h2 {
  margin-top: 0;
  color: #155724;
}

.result p {
  margin: 5px 0;
  color: #155724;
}
</style>
