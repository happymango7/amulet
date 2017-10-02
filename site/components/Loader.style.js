export default `
#loader {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: transparent;
  border-top: 4px solid rgba(74, 74, 74, 0.25);
  border-right: 4px solid rgba(74, 74, 74, 0.25);
  border-bottom: 4px solid #777;
  border-left: 4px solid #777;
  -webkit-animation: loader 1.2s infinite linear;
  -moz-animation: loader 1.2s infinite linear;
  -ms-animation: loader 1.2s infinite linear;
  animation: loader 1.2s infinite linear;
}

/* Animation */
@-webkit-keyframes loader {
  to { -webkit-transform: rotate(360deg); }
}
@-moz-keyframes loader {
  to { -moz-transform: rotate(360deg); }
}
@-ms-keyframes loader {
  to { -ms-transform: rotate(360deg); }
}
@keyframes loader {
  to { transform: rotate(360deg); }
}
`;
