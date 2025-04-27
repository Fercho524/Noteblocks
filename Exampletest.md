# Ejemplo de Documento Markdown

## 1. Introducción

Este documento sirve como ejemplo de las múltiples características que puede tener un archivo en formato **Markdown**.

---

## 2. Ecuaciones

Podemos incluir ecuaciones en formato LaTeX, por ejemplo:

Ecuación cuadrática:

$$
ax^2 + bx + c = 0
$$

Solución de la ecuación cuadrática:

$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$

---

## 3. Tabla de Datos

Aquí un ejemplo de tabla en Markdown:

| Nombre    | Edad | Profesión      |
|-----------|------|----------------|
| Ana       | 29   | Ingeniera       |
| Luis      | 35   | Matemático      |
| Carolina  | 42   | Doctora         |

---

## 4. Bloque de Código

También podemos mostrar código en distintos lenguajes. Por ejemplo, en **Python**:

```python
def ecuacion_cuadratica(a, b, c):
    discriminante = b**2 - 4*a*c
    if discriminante < 0:
        return "No hay soluciones reales"
    else:
        x1 = (-b + discriminante**0.5) / (2*a)
        x2 = (-b - discriminante**0.5) / (2*a)
        return x1, x2

# Ejemplo de uso
resultado = ecuacion_cuadratica(1, -3, 2)
print(resultado)
```

---

## 5. Lista de Características

- **Ecuaciones** con LaTeX
- **Tablas** de datos
- **Bloques de código**
- **Listas** ordenadas y desordenadas
- **Énfasis** como _cursiva_ y **negrita**

---

## 6. Cita

> “La simplicidad es la máxima sofisticación.”  
> — Leonardo da Vinci

---

## 7. Imagen (opcional)

Podríamos también incluir imágenes:

![Ejemplo de imagen](https://via.placeholder.com/150)

---

¿Te gustaría que también te prepare una versión extendida con más ejemplos, como diagramas o gráficos? 🚀