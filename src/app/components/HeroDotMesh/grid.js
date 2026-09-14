export const SPACING = 26;

export const NAV_COL_FROM_RIGHT = 2;
export const NAV_ROW_START = 2;
export const NAV_COUNT = 4;

export const getMeshGrid = (width, height) => {
    const cols = Math.ceil(width / SPACING) + 1;
    const rows = Math.ceil(height / SPACING) + 1;
    const ox = (width - (cols - 1) * SPACING) / 2;
    const oy = (height - (rows - 1) * SPACING) / 2;
    return { cols, rows, ox, oy };
};

export const getNavMeshAnchor = (width, height) => {
    const { cols, ox, oy } = getMeshGrid(width, height);
    const col = Math.max(0, cols - 1 - NAV_COL_FROM_RIGHT);
    const row = NAV_ROW_START;
    return {
        x: ox + col * SPACING,
        y: oy + row * SPACING,
        col,
        row,
        cols,
    };
};

export const isNavMeshCell = (col, row, cols) =>
    col === cols - 1 - NAV_COL_FROM_RIGHT &&
    row >= NAV_ROW_START &&
    row < NAV_ROW_START + NAV_COUNT;
