import java.util.Scanner;
public abstract class Shape {
    private int height;
    private int width;
    public int getHeight() {
        return height;
    }
    public void setHeight(int height) {
        this.height = height;
    }
    public int getWidth() {
        return width;
    }
    public void setWidth(int width) {
        this.width = width;
    }
    public abstract void run();
    public abstract void printPerimeter();
    public  void scan(){
        Scanner scanner = new Scanner(System.in);
        System.out.println("enter height");
        this.height = scanner.nextInt();
        System.out.println("enter width");
        this.width = scanner.nextInt();
    }
}
