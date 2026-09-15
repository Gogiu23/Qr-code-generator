export function AppIconMark({
  size,
  padding = 0,
}: {
  size: number;
  padding?: number;
}) {
  const inner = size - padding * 2;

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EAFFD0",
      }}
    >
      <div
        style={{
          width: inner,
          height: inner,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#333333",
          borderRadius: inner * 0.22,
        }}
      >
        <div
          style={{
            width: inner * 0.62,
            height: inner * 0.62,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#EAFFD0",
            borderRadius: inner * 0.14,
          }}
        >
          <div
            style={{
              width: inner * 0.32,
              height: inner * 0.32,
              display: "flex",
              backgroundColor: "#333333",
              borderRadius: inner * 0.09,
            }}
          />
        </div>
      </div>
    </div>
  );
}
