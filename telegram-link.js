/* ══════════════════════════════════════════════════════════════
   현장영업 가이드 — 텔레그램 업무지원 봇 계정 연결 (로그아웃 버튼 옆)
   연결 안 됨: [텔레그램 ID] [계정 연결하기]  /  연결됨: 텔레그램 연결됨 [계정 연결 해제]
   승인된 계정에 텔레그램 ID 가 연결돼 있어야 봇(@skylife_support_bot)을 쓸 수 있다.
   DB 함수: skylife-inquiry/schema_bot.sql (set_my_telegram_id / unlink_my_telegram)
   index.html 의 sb, showInfoModal 을 쓴다.
   ══════════════════════════════════════════════════════════════ */
const TgLink = (() => {
  const BOT = '@skylife_support_bot';
  const HOW_TO =
    '텔레그램 ID 확인 방법\n\n' +
    '1. 텔레그램에서 ' + BOT + ' 검색\n' +
    '2. 봇에게 /id 라고 보내기\n' +
    '3. 답으로 온 숫자를 그대로 입력';
  let el = null;
  let current = null;  // 연결된 텔레그램 ID (문자열) 또는 null

  async function init(session) {
    el = document.getElementById('tg-link');
    if (!el) return;
    const { data } = await sb.from('profiles').select('telegram_id').eq('id', session.user.id).single();
    current = data && data.telegram_id ? String(data.telegram_id) : null;
    render();
    el.hidden = false;
  }

  function button(text, cls, onClick) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = cls;
    b.textContent = text;
    b.onclick = onClick;
    return b;
  }

  // 히어로의 「텔레그램 업무 지원봇」 버튼 — 연결된 계정만 활성화
  function updateBotButton() {
    const b = document.getElementById('bot-btn');
    if (!b) return;
    b.classList.toggle('is-disabled', !current);
    b.setAttribute('aria-disabled', current ? 'false' : 'true');
  }

  function openBot(e) {
    if (current) return true;  // 링크 그대로 열기 (새 창 → 텔레그램 봇 대화방)
    e.preventDefault();
    showInfoModal('업무 지원 봇 사용을 위해서는 텔레그램 계정을 등록해 주세요.\n\n' +
      '화면 위쪽 로그아웃 버튼 옆에 텔레그램 ID를 넣고 「계정 연결하기」를 누르면 됩니다.\n\n' + HOW_TO);
    return false;
  }

  function render() {
    updateBotButton();
    el.textContent = '';
    el.classList.toggle('linked', !!current);
    if (current) {
      const st = document.createElement('span');
      st.className = 'tg-status';
      st.textContent = '텔레그램 연결됨';
      st.title = '텔레그램 ID ' + current;
      el.append(st, button('계정 연결 해제', 'tg-btn', unlink));
      return;
    }
    const input = document.createElement('input');
    input.type = 'text';
    input.inputMode = 'numeric';
    input.maxLength = 15;
    input.className = 'tg-input';
    input.placeholder = '텔레그램 ID';
    input.setAttribute('aria-label', '텔레그램 ID');
    input.onkeydown = e => { if (e.key === 'Enter') link(input, connect); };
    const connect = button('계정 연결하기', 'tg-btn primary', () => link(input, connect));
    const help = button('ID 확인 방법', 'tg-help', () => showInfoModal(HOW_TO));
    el.append(input, connect, help);
  }

  async function link(input, btn) {
    const v = input.value.trim();
    if (!/^\d{5,15}$/.test(v)) { showInfoModal('텔레그램 ID는 숫자만 입력해주세요.\n\n' + HOW_TO); input.focus(); return; }
    btn.disabled = true; btn.textContent = '연결 중...';
    const { error } = await sb.rpc('set_my_telegram_id', { tg_id: Number(v) });
    btn.disabled = false; btn.textContent = '계정 연결하기';
    if (error) {
      const m = error.message || '';
      if (/already used/i.test(m)) showInfoModal('이미 다른 계정에 연결된 텔레그램 ID입니다.\nID를 다시 확인하시거나 담당자에게 문의해주세요.');
      else if (/not approved/i.test(m)) showInfoModal('승인된 계정만 연결할 수 있습니다.');
      else showInfoModal('연결하지 못했습니다. 잠시 후 다시 시도해주세요.');
      return;
    }
    current = v;
    render();
    showInfoModal('텔레그램이 연결됐습니다.\n이제 ' + BOT + ' 에서 업무를 물어보실 수 있습니다.');
  }

  async function unlink() {
    if (!confirm('텔레그램 연결을 해제할까요?\n해제하면 업무지원 봇을 사용할 수 없습니다.')) return;
    const { error } = await sb.rpc('unlink_my_telegram');
    if (error) { showInfoModal('해제하지 못했습니다. 잠시 후 다시 시도해주세요.'); return; }
    current = null;
    render();
  }

  return { init, openBot };
})();
