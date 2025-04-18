const user = new URLSearchParams(location.search).get('user');

function render(keys) {
  $('#keyboard').empty();
  keys.forEach((k, i) => {
    const color = k == '1' ? 'red' : k == '2' ? 'yellow' : 'white';
    $('#keyboard').append(
      `<button class="key" data-index="${i}" style="background:${color}; width:50px; height:50px;"></button>`
    );
  });
}

function pollState() {
  $.get('api/keyboards/', (res) => {
    render(res.keys);

    if (res.control === null) {
      $('#status').text('No user has control now');
    } else {
      $('#status').text(`User ${res.control} has control`);
    }
  });
}

$('#controlBtn').click(() => {
  $.ajax({
    url: 'api/keyboards/control',
    method: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify({ user }),
    success: (res) => {
      if (res.success) alert('Control acquired');
      else alert(res.message);
    },
  });
});

$('#keyboard').on('click', '.key', function () {
  const index = $(this).data('index');
  $.ajax({
    url: 'api/keyboards/toggle',
    method: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify({ user, index }),
    success: pollState,
  });
});
setInterval(pollState, 1000);
