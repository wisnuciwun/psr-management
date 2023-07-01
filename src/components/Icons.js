function IconSearch(props) {
    return (
      <svg
        viewBox="0 0 1024 1024"
        fill="currentColor"
        height="1em"
        width="1em"
        {...props}
      >
        <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
      </svg>
    );
}

function IconEnterOutline(props) {
    return (
      <svg
        viewBox="0 0 512 512"
        fill="currentColor"
        height="1em"
        width="1em"
        {...props}
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={32}
          d="M176 176v-40a40 40 0 0140-40h208a40 40 0 0140 40v240a40 40 0 01-40 40H216a40 40 0 01-40-40v-40"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={32}
          d="M272 336l80-80-80-80M48 256h288"
        />
      </svg>
    );
  }

  function IconArrowsAngleExpand(props) {
    return (
      <svg
        fill="currentColor"
        viewBox="0 0 16 16"
        height="1em"
        width="1em"
        {...props}
      >
        <path
          fillRule="evenodd"
          d="M5.828 10.172a.5.5 0 00-.707 0l-4.096 4.096V11.5a.5.5 0 00-1 0v3.975a.5.5 0 00.5.5H4.5a.5.5 0 000-1H1.732l4.096-4.096a.5.5 0 000-.707zm4.344-4.344a.5.5 0 00.707 0l4.096-4.096V4.5a.5.5 0 101 0V.525a.5.5 0 00-.5-.5H11.5a.5.5 0 000 1h2.768l-4.096 4.096a.5.5 0 000 .707z"
        />
      </svg>
    );
  }

export { IconSearch, IconEnterOutline, IconArrowsAngleExpand };