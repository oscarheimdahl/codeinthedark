export const defaultHTML = `<div class="example">
  <div class="gradient-background">
    <div class="title">Code in the dark</div>
  </div>
</div>
`;

export const defaultCSS = `
.example {
  background: rgb(38, 41, 54);
  display: flex;
  justify-content: center;
  align-items: center;
}

.gradient-background {
  margin: 2rem;
  padding: 0.2rem;
  border-radius: 1rem;
  background-image: repeating-conic-gradient(
    crimson 0%,
    darkorange 40%,
    purple 70%,
    crimson
  );
  box-shadow:
    0 4px 40px rgba(255, 0, 0, 0.2),
    0 4px 10px rgba(0, 0, 255, 0.2);
}

.title {
  color: white;
  padding: 1rem;
  background-color: rgb(33, 34, 44);
  border-radius: 0.8rem;
}
`;
