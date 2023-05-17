<script>
  import { createEventDispatcher } from 'svelte';

  export let title = '';
  export let buttonText = '';
  export let action = () => {};

  const dispatch = createEventDispatcher();

  function performAction() {
    action();
    dispatch('close');
  }
</script>

<div class="modal fade-in">
  <div class="modal-content">
    <h2>{title}</h2>
    <button on:click={performAction}>{buttonText}</button>
  </div>
</div>

<style>
  /* Style the modal and its content */
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .fade-in {
    animation: fade-in 0.2s;
  }

  .modal {
    color: #b5a337;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
  }

  button {
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: #b5a337;
  }
</style>
