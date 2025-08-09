import { Docker } from '@icons/Docker'
import { Kubernetes } from '@icons/Kubernetes'
import { Helm } from '@icons/Helm'
import { Nginx } from '@icons/Nginx'
import { Git } from '@icons/Git'
import { GithubActions } from '@icons/GithubActions'
import { Jenkins } from '@icons/Jenkins'
import { Python } from '@icons/Python'
import { Flask } from '@icons/Flask'
import { Aws } from '@icons/Aws'
import { Eks } from '@icons/Eks'
// (GCP omitted to align with explicit skills list)
import { Ansible } from '@icons/Ansible'
import { Terraform } from '@icons/Terraform'
import { Linux } from '@icons/Linux'
import { Bash } from '@icons/Bash'
import { Grafana } from '@icons/Grafana'
import { Prometheus } from '@icons/Prometheus'
import { Portswigger } from '@icons/Portswigger'
import { Owasp } from '@icons/Owasp'
import { Zap } from '@icons/Zap'
import { ProjectDiscovery } from '@icons/ProjectDiscovery'
import { Subfinder } from '@icons/Subfinder'
import { Nikto } from '@icons/Nikto'
import { Nmap } from '@icons/Nmap'
import { Vmware } from '@icons/Vmware'
import { Boto3 } from '@icons/Boto3'
import { SecretsManager } from '@icons/SecretsManager'
import { GuardDuty } from '@icons/GuardDuty'
import { Waf } from '@icons/Waf'
import { Kms } from '@icons/Kms'
import { CloudTrail } from '@icons/CloudTrail'
import { ComfyUI } from '@icons/ComfyUI'
import { StableDiffusion } from '@icons/StableDiffusion'
import { Lora } from '@icons/Lora'
import { Runpod } from '@icons/Runpod'
import { N8n } from '@icons/N8n'
import type { JSX, SVGProps } from 'react'

type TechStack = {
  name: string
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  description: string
}

const techStacks: TechStack[] = [
  { name: 'AWS', icon: Aws, description: 'Cloud compute, storage, security, and managed services.' },
  { name: 'EKS (Kubernetes)', icon: Eks, description: 'Managed Kubernetes on AWS for scalable workloads.' },
  { name: 'Kubernetes', icon: Kubernetes, description: 'Container orchestration at scale.' },
  { name: 'Helm', icon: Helm, description: 'Package manager and templating for Kubernetes.' },
  { name: 'Nginx Ingress', icon: Nginx, description: 'Ingress routing and load balancing for K8s.' },
  { name: 'Docker', icon: Docker, description: 'Containerize apps for reproducible deployments.' },
  { name: 'Terraform', icon: Terraform, description: 'Infrastructure as Code for cloud provisioning.' },
  { name: 'Ansible', icon: Ansible, description: 'Agentless configuration management and automation.' },
  { name: 'Git', icon: Git, description: 'Distributed version control.' },
  { name: 'GitHub Actions', icon: GithubActions, description: 'Native CI/CD pipelines in GitHub.' },
  { name: 'Jenkins', icon: Jenkins, description: 'CI/CD automation at scale.' },
  { name: 'Linux', icon: Linux, description: 'Server OS and container hosts.' },
  { name: 'Bash', icon: Bash, description: 'Shell scripting and automation.' },
  { name: 'Python', icon: Python, description: 'Automation, APIs, and scripting.' },
  { name: 'Flask', icon: Flask, description: 'Lightweight Python web framework.' },
  { name: 'Boto3', icon: Boto3, description: 'AWS SDK for Python automation.' },
  
  { name: 'Grafana', icon: Grafana, description: 'Dashboards and observability.' },
  { name: 'Prometheus', icon: Prometheus, description: 'Metrics and alerting.' },
  { name: 'GuardDuty', icon: GuardDuty, description: 'Threat detection and monitoring.' },
  { name: 'Burp Suite', icon: Portswigger, description: 'Web security testing suite.' },
  { name: 'OWASP ZAP', icon: Zap, description: 'Open-source DAST scanner.' },
  { name: 'OWASP', icon: Owasp, description: 'Security best practices and standards.' },
  { name: 'ProjectDiscovery', icon: ProjectDiscovery, description: 'Recon and security tooling ecosystem.' },
  { name: 'Subfinder', icon: Subfinder, description: 'Subdomain discovery tool.' },
  { name: 'Nikto', icon: Nikto, description: 'Web server vulnerability scanner.' },
  { name: 'Nmap', icon: Nmap, description: 'Network exploration and security auditing.' },
  { name: 'VMware ESXi', icon: Vmware, description: 'Bare-metal hypervisor for virtualization.' },
  { name: 'n8n', icon: N8n, description: 'Workflow automation for integrations.' },
  { name: 'AWS WAF', icon: Waf, description: 'Web application firewall for AWS workloads.' },
  { name: 'AWS KMS', icon: Kms, description: 'Key management and encryption services.' },
  { name: 'Secrets Manager', icon: SecretsManager, description: 'Secure secret storage and rotation.' },
  { name: 'CloudTrail', icon: CloudTrail, description: 'Audit logs for governance and compliance.' },
  { name: 'Stable Diffusion', icon: StableDiffusion, description: 'Text-to-image generative AI model.' },
  { name: 'LoRA', icon: Lora, description: 'Low-Rank Adaptation for finetuning models.' },
  { name: 'ComfyUI', icon: ComfyUI, description: 'Node-based Stable Diffusion workflow UI.' },
  { name: 'Runpod', icon: Runpod, description: 'On-demand GPU compute for AI workloads.' }
]

export default techStacks
