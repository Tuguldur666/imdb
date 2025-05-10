export interface ApiResponse<T> {
    action: string;
    resultCode: number;
    resultMessage: string;
    curdate: string;
    size: number;
    data: T;
  }
  // types.ts
export type Category = {
    cat_id: string;
    cat_name: string;
    cat_color: string;
    cat_desc?: string;
  };
  