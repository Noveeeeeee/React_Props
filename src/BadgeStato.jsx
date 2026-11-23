function BadgeStato({ stato }) {
  return (
    <span className={`badge badge-${stato}`}>
      {stato === "ok"
        ? "OK"
        : stato === "attenzione"
          ? "Attenzione"
          : stato === "critico"
            ? "Critico"
            : "Offline"}
    </span>
  )
}

export default BadgeStato