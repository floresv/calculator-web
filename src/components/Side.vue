<template>
  <div class="greetings">
    <h1 class="green">Calculator</h1>
    <h2>Hello.</h2>
    <h3>
      <p>
        This calculator can do addition, subtraction, multiplication, division, square roots, and
        even generate random strings!
      </p>
      <p>It runs on cloud servers and uses Python to perform the calculations.</p>
      <p>Each calculation has a cost.</p>
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
