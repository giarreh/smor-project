import './Home.css';
export default function Home() {
  return (
      <div className='content'>
        <p>
          Everything here is smooth, warm, and melts in your mouth. Enjoy the creamy vibes! 🍯
        </p>

        <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          Spread the love! 💛
        </a>

        <br />
        <br />

        <button onClick={() => alert('Mmm... Butter! 🧈😋')}>
          Melt Me! 🍞
        </button>
      </div>
  );
}
